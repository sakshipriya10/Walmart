import cv2
import mediapipe as mp
import numpy as np
import sys

def rotate_image(img, angle):
    h, w = img.shape[:2]
    center = (w // 2, h // 2)
    rot_mat = cv2.getRotationMatrix2D(center, angle, 1.0)
    return cv2.warpAffine(img, rot_mat, (w, h), flags=cv2.INTER_LINEAR, borderMode=cv2.BORDER_CONSTANT, borderValue=(0, 0, 0, 0))

def overlay_alpha(bg, fg, x, y):
    h, w = fg.shape[:2]
    if x + w > bg.shape[1] or y + h > bg.shape[0]:
        raise ValueError("Overlay out of bounds")

    roi = bg[y:y+h, x:x+w]

    if fg.shape[2] == 4:
        alpha = fg[:, :, 3] / 255.0
        for c in range(3):
            roi[:, :, c] = alpha * fg[:, :, c] + (1 - alpha) * roi[:, :, c]
    else:
        fg_gray = cv2.cvtColor(fg, cv2.COLOR_BGR2GRAY)
        _, mask = cv2.threshold(fg_gray, 240, 255, cv2.THRESH_BINARY_INV)
        fg_clean = cv2.bitwise_and(fg, fg, mask=mask)
        bg_clean = cv2.bitwise_and(roi, roi, mask=cv2.bitwise_not(mask))
        roi[:] = cv2.add(bg_clean, fg_clean)

try:
    user_img_path = sys.argv[1]
    cloth_img_path = sys.argv[2]
    output_path = sys.argv[3]

    user_img = cv2.imread(user_img_path)
    cloth_img = cv2.imread(cloth_img_path, cv2.IMREAD_UNCHANGED)
    if user_img is None or cloth_img is None:
        raise ValueError("Image loading failed.")

    h, w = user_img.shape[:2]
    mp_pose = mp.solutions.pose
    pose = mp_pose.Pose(static_image_mode=True)
    results = pose.process(cv2.cvtColor(user_img, cv2.COLOR_BGR2RGB))

    if not results.pose_landmarks:
        raise ValueError("Pose not detected.")

    lm = results.pose_landmarks.landmark
    l_shoulder = lm[mp_pose.PoseLandmark.LEFT_SHOULDER]
    r_shoulder = lm[mp_pose.PoseLandmark.RIGHT_SHOULDER]
    l_hip = lm[mp_pose.PoseLandmark.LEFT_HIP]
    r_hip = lm[mp_pose.PoseLandmark.RIGHT_HIP]

    # Convert to pixels
    lx, ly = int(l_shoulder.x * w), int(l_shoulder.y * h)
    rx, ry = int(r_shoulder.x * w), int(r_shoulder.y * h)
    mx, my = (lx + rx) // 2, (ly + ry) // 2
    hip_y = int(((l_hip.y + r_hip.y) / 2) * h)

    # Size
    shoulder_width = int(np.hypot(rx - lx, ry - ly))
    torso_height = int(hip_y - min(ly, ry))
    if shoulder_width <= 0 or torso_height <= 0:
        raise ValueError("Invalid body proportions.")

    cloth_w = int(shoulder_width * 1.5)
    cloth_h = int(torso_height * 1.25)
    cloth_resized = cv2.resize(cloth_img, (cloth_w, cloth_h))

    # Rotation
    angle = np.degrees(np.arctan2(ry - ly, rx - lx))
    if -30 <= angle <= 30:
        cloth_rotated = rotate_image(cloth_resized, angle)
    else:
        cloth_rotated = cloth_resized

    # Position
    x_start = max(0, mx - cloth_rotated.shape[1] // 2)
    y_start = max(0, min(ly, ry) + 10)
    overlay_alpha(user_img, cloth_rotated, x_start, y_start)

    cv2.imwrite(output_path, user_img)
    print(f"✅ Saved to {output_path}")

except Exception as e:
    print(f"❌ Python Script Error: {str(e)}", file=sys.stderr)
    sys.exit(1)

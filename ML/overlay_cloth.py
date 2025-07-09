import cv2
import mediapipe as mp
import numpy as np
import sys

def rotate_image(img, angle):
    h, w = img.shape[:2]
    center = (w // 2, h // 2)
    rot_mat = cv2.getRotationMatrix2D(center, angle, 1.0)
    return cv2.warpAffine(img, rot_mat, (w, h), flags=cv2.INTER_LINEAR, borderMode=cv2.BORDER_CONSTANT, borderValue=(0, 0, 0, 0))

try:
    user_img_path = sys.argv[1]
    cloth_img_path = sys.argv[2]
    output_path = sys.argv[3]

    user_img = cv2.imread(user_img_path)
    cloth_img = cv2.imread(cloth_img_path, cv2.IMREAD_UNCHANGED)

    if user_img is None or cloth_img is None:
        raise ValueError("Image loading failed.")

    mp_pose = mp.solutions.pose
    pose = mp_pose.Pose(static_image_mode=True)
    results = pose.process(cv2.cvtColor(user_img, cv2.COLOR_BGR2RGB))

    if not results.pose_landmarks:
        raise ValueError("Pose not detected.")

    landmarks = results.pose_landmarks.landmark
    h, w, _ = user_img.shape

    # Key landmarks
    l_shoulder = landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER]
    r_shoulder = landmarks[mp_pose.PoseLandmark.RIGHT_SHOULDER]
    l_hip = landmarks[mp_pose.PoseLandmark.LEFT_HIP]
    r_hip = landmarks[mp_pose.PoseLandmark.RIGHT_HIP]

    lx, ly = int(l_shoulder.x * w), int(l_shoulder.y * h)
    rx, ry = int(r_shoulder.x * w), int(r_shoulder.y * h)
    mx, my = (lx + rx) // 2, (ly + ry) // 2

    hip_y = int(((l_hip.y + r_hip.y) / 2) * h)
    shoulder_width = int(np.hypot(rx - lx, ry - ly))
    torso_height = int(hip_y - min(ly, ry))

    if shoulder_width <= 0 or torso_height <= 0:
        raise ValueError("Invalid body proportions.")

    # Scale cloth size with buffer
    cloth_width = int(shoulder_width * 1.6)
    cloth_height = int(torso_height * 1.3)
    cloth_resized = cv2.resize(cloth_img, (cloth_width, cloth_height), interpolation=cv2.INTER_AREA)

    # Determine rotation angle between shoulders
    delta_y = ry - ly
    delta_x = rx - lx
    angle = np.degrees(np.arctan2(delta_y, delta_x))

    # ✅ Prevent upside-down shirts
    if -30 <= angle <= 30:
        cloth_rotated = rotate_image(cloth_resized, angle)
    else:
        cloth_rotated = cloth_resized

    # Overlay position
    x_start = max(0, mx - cloth_rotated.shape[1] // 2)
    y_start = max(0, min(ly, ry) + 10)

    x_end = min(w, x_start + cloth_rotated.shape[1])
    y_end = min(h, y_start + cloth_rotated.shape[0])

    cloth_cropped = cloth_rotated[0:(y_end - y_start), 0:(x_end - x_start)]
    roi = user_img[y_start:y_end, x_start:x_end]

    if cloth_cropped.shape[:2] != roi.shape[:2]:
        raise ValueError("Overlay size mismatch.")

    # Alpha blending
    if cloth_cropped.shape[2] == 4:
        alpha = cloth_cropped[:, :, 3] / 255.0
        for c in range(3):
            roi[:, :, c] = alpha * cloth_cropped[:, :, c] + (1 - alpha) * roi[:, :, c]
    else:
        mask = cv2.cvtColor(cloth_cropped, cv2.COLOR_BGR2GRAY)
        _, mask_bin = cv2.threshold(mask, 240, 255, cv2.THRESH_BINARY_INV)
        fg = cv2.bitwise_and(cloth_cropped, cloth_cropped, mask=mask_bin)
        bg = cv2.bitwise_and(roi, roi, mask=cv2.bitwise_not(mask_bin))
        roi[:] = cv2.add(bg, fg)

    # Save result
    cv2.imwrite(output_path, user_img)
    print(f"Saved to {output_path}")

except Exception as e:
    print(f"Python Script Error: {str(e)}", file=sys.stderr)
    sys.exit(1)

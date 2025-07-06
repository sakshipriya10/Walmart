import cv2
import mediapipe as mp
import numpy as np
import sys
import os

try:
    # Get CLI arguments
    user_img_path = sys.argv[1]
    cloth_img_path = sys.argv[2]
    output_path = sys.argv[3]

    # Load images
    user_img = cv2.imread(user_img_path)
    cloth_img = cv2.imread(cloth_img_path, cv2.IMREAD_UNCHANGED)

    if user_img is None or cloth_img is None:
        raise ValueError(" One or both images could not be loaded.")

    # Pose detection
    mp_pose = mp.solutions.pose
    pose = mp_pose.Pose(static_image_mode=True)
    results = pose.process(cv2.cvtColor(user_img, cv2.COLOR_BGR2RGB))

    if not results.pose_landmarks:
        raise ValueError("Pose not detected in user image.")

    landmarks = results.pose_landmarks.landmark
    h, w, _ = user_img.shape

    # Get key body points
    left_shoulder = landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER]
    right_shoulder = landmarks[mp_pose.PoseLandmark.RIGHT_SHOULDER]
    left_hip = landmarks[mp_pose.PoseLandmark.LEFT_HIP]
    right_hip = landmarks[mp_pose.PoseLandmark.RIGHT_HIP]

    # Convert to pixel coordinates
    left_x, left_y = int(left_shoulder.x * w), int(left_shoulder.y * h)
    right_x, right_y = int(right_shoulder.x * w), int(right_shoulder.y * h)
    hip_y = int(((left_hip.y + right_hip.y) / 2) * h)

    # Compute dimensions
    shoulder_width = np.linalg.norm([right_x - left_x, right_y - left_y])
    torso_height = hip_y - min(left_y, right_y)

    if shoulder_width <= 0 or torso_height <= 0:
        raise ValueError(" Invalid body landmark measurements.")

    cloth_width = int(shoulder_width * 1.6)
    cloth_height = int(torso_height * 1.3)

    # Resize cloth
    cloth_resized = cv2.resize(cloth_img, (cloth_width, cloth_height), interpolation=cv2.INTER_AREA)

    # Determine overlay position
    x_center = (left_x + right_x) // 2
    x_start = max(0, x_center - cloth_width // 2)
    y_start = max(0, min(left_y, right_y) + 10)

    x_end = min(w, x_start + cloth_resized.shape[1])
    y_end = min(h, y_start + cloth_resized.shape[0])

    # Ensure sizes match
    cloth_resized = cloth_resized[:y_end - y_start, :x_end - x_start]
    roi = user_img[y_start:y_end, x_start:x_end]

    if cloth_resized.shape[0] != roi.shape[0] or cloth_resized.shape[1] != roi.shape[1]:
        raise ValueError(" Resized cloth and ROI size mismatch.")

    # Alpha blending or background removal
    if cloth_resized.shape[2] == 4:
        alpha = cloth_resized[:, :, 3] / 255.0
        for c in range(3):
            roi[:, :, c] = (
                alpha * cloth_resized[:, :, c] +
                (1 - alpha) * roi[:, :, c]
            )
    else:
        gray = cv2.cvtColor(cloth_resized, cv2.COLOR_BGR2GRAY)
        _, mask = cv2.threshold(gray, 240, 255, cv2.THRESH_BINARY_INV)
        mask_inv = cv2.bitwise_not(mask)

        fg = cv2.bitwise_and(cloth_resized, cloth_resized, mask=mask)
        bg = cv2.bitwise_and(roi, roi, mask=mask_inv)
        roi[:] = cv2.add(bg, fg)

    # Save the output
    cv2.imwrite(output_path, user_img)
    print(f" Saved to {output_path}")

except Exception as e:
    print(f" Python Script Error: {str(e)}", file=sys.stderr)
    sys.exit(1)

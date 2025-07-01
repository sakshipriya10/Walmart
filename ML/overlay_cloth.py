import cv2
import mediapipe as mp
import numpy as np
import sys
import os

# Read CLI arguments
user_img_path = sys.argv[1]  # e.g., test/user.png
cloth_img_path = sys.argv[2]  # e.g., test/cloth.png
output_path = sys.argv[3]  # e.g., uploads/result.png

# Load images
user_img = cv2.imread(user_img_path)
cloth_img = cv2.imread(cloth_img_path, cv2.IMREAD_UNCHANGED)

# ✅ Correctly initialize MediaPipe Pose
mp_pose = mp.solutions.pose
pose = mp_pose.Pose(static_image_mode=True)

# Detect pose landmarks
results = pose.process(cv2.cvtColor(user_img, cv2.COLOR_BGR2RGB))
if not results.pose_landmarks:
    print("Pose not detected")
    sys.exit(1)

landmarks = results.pose_landmarks.landmark
h, w, _ = user_img.shape

# Get shoulder coordinates
left_shoulder = landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER]
right_shoulder = landmarks[mp_pose.PoseLandmark.RIGHT_SHOULDER]

x1, y1 = int(left_shoulder.x * w), int(left_shoulder.y * h)
x2, y2 = int(right_shoulder.x * w), int(right_shoulder.y * h)

# Compute cloth width & height
cloth_width = int(((x2 - x1) ** 2 + (y2 - y1) ** 2) ** 0.5 * 2.3)
cloth_height = int(cloth_img.shape[0] * (cloth_width / cloth_img.shape[1]))
cloth_resized = cv2.resize(cloth_img, (cloth_width, cloth_height))

# Overlay position
x_center = (x1 + x2) // 2
y_offset = y1
x_start = x_center - cloth_width // 2
y_start = y_offset

# Ensure boundaries
x_start = max(0, x_start)
y_start = max(0, y_start)
x_end = min(w, x_start + cloth_width)
y_end = min(h, y_start + cloth_height)

cloth_resized = cloth_resized[:y_end - y_start, :x_end - x_start]

# Handle alpha mask
if cloth_resized.shape[2] == 4:
    alpha = cloth_resized[:, :, 3] / 255.0
    for c in range(3):
        user_img[y_start:y_end, x_start:x_end, c] = (
            alpha * cloth_resized[:, :, c] +
            (1 - alpha) * user_img[y_start:y_end, x_start:x_end, c]
        )
else:
    user_img[y_start:y_end, x_start:x_end] = cloth_resized

cv2.imwrite(output_path, user_img)
print(f"Saved output to {output_path}")

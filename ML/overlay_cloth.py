import cv2
import mediapipe as mp
import numpy as np
import sys
import os

# CLI arguments
user_img_path = sys.argv[1]
cloth_img_path = sys.argv[2]
output_path = sys.argv[3]

# Load images
user_img = cv2.imread(user_img_path)
cloth_img = cv2.imread(cloth_img_path, cv2.IMREAD_UNCHANGED)

if user_img is None:
    print("❌ Could not load user image.")
    sys.exit(1)

if cloth_img is None:
    print("❌ Could not load cloth image.")
    sys.exit(1)

# Setup MediaPipe Pose
mp_pose = mp.solutions.pose
pose = mp_pose.Pose(static_image_mode=True)
results = pose.process(cv2.cvtColor(user_img, cv2.COLOR_BGR2RGB))

if not results.pose_landmarks:
    print("❌ Pose not detected")
    sys.exit(1)

landmarks = results.pose_landmarks.landmark
h, w, _ = user_img.shape

# Get key landmarks
left_shoulder = landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER]
right_shoulder = landmarks[mp_pose.PoseLandmark.RIGHT_SHOULDER]
neck = landmarks[mp_pose.PoseLandmark.NOSE]  # Approx neck (optional)

# Convert to pixel coordinates
left_x, left_y = int(left_shoulder.x * w), int(left_shoulder.y * h)
right_x, right_y = int(right_shoulder.x * w), int(right_shoulder.y * h)
neck_x, neck_y = int(neck.x * w), int(neck.y * h)

# Calculate cloth width and height
shoulder_width = int(np.linalg.norm([right_x - left_x, right_y - left_y]))
cloth_width = int(shoulder_width * 2.0)
scale_ratio = cloth_width / cloth_img.shape[1]
cloth_height = int(cloth_img.shape[0] * scale_ratio)

# Resize cloth image
cloth_resized = cv2.resize(cloth_img, (cloth_width, cloth_height), interpolation=cv2.INTER_AREA)

# Calculate placement
x_center = (left_x + right_x) // 2
x_start = max(0, x_center - cloth_width // 2)
y_start = max(0, neck_y + 20)

x_end = min(w, x_start + cloth_resized.shape[1])
y_end = min(h, y_start + cloth_resized.shape[0])

cloth_resized = cloth_resized[:y_end - y_start, :x_end - x_start]

# Background removal helper
def remove_white_bg(image):
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    _, mask = cv2.threshold(gray, 240, 255, cv2.THRESH_BINARY_INV)
    return mask

# Overlay logic
roi = user_img[y_start:y_end, x_start:x_end]

if cloth_resized.shape[2] == 4:
    # Handle alpha transparency
    alpha = cloth_resized[:, :, 3] / 255.0
    for c in range(3):
        roi[:, :, c] = (
            alpha * cloth_resized[:, :, c] +
            (1 - alpha) * roi[:, :, c]
        )
else:
    # Remove white background manually
    cloth_rgb = cloth_resized[:, :, :3]
    mask = remove_white_bg(cloth_rgb)
    mask_inv = cv2.bitwise_not(mask)

    fg = cv2.bitwise_and(cloth_rgb, cloth_rgb, mask=mask)
    bg = cv2.bitwise_and(roi, roi, mask=mask_inv)

    combined = cv2.add(bg, fg)
    user_img[y_start:y_end, x_start:x_end] = combined

# Save result
cv2.imwrite(output_path, user_img)
print(f"Saved output to {output_path}")

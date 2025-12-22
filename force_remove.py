import os
import shutil
import time

target = r'd:\work_shameer\raj-kharel\src\app\api\socket'
print(f"Attempting to remove {target}")

for i in range(5):
    try:
        if os.path.exists(target):
            shutil.rmtree(target)
            print("Successfully removed directory")
            break
        else:
            print("Target does not exist")
            break
    except Exception as e:
        print(f"Attempt {i+1} failed: {e}")
        time.sleep(1)

# Check individual file if directory still exists
file_target = os.path.join(target, 'route.ts')
if os.path.exists(file_target):
    print(f"File {file_target} still exists. Attempting move...")
    try:
        os.rename(file_target, file_target + '.disabled')
        print("Successfully renamed file")
    except Exception as e:
        print(f"Rename failed: {e}")

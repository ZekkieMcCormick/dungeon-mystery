#AI Generated

import subprocess

def call_typescript(filePath):
    try:
        # Call the TypeScript compiler as a subprocess
        subprocess.run(['tsc', filePath], check=True)
        print("TypeScript code compiled successfully.")
    except subprocess.CalledProcessError as e:
        print("TypeScript compilation failed with error:", e)
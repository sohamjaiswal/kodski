import os

def list_directory_contents(directory_path):
    memes = []
    try:
        contents = os.listdir(directory_path)
        for item in contents:
            memes.append(item)
    except OSError as e:
        print(f"An error occurred: {e}")
    return memes

if __name__ == "__main__":
    path = './app/static/emojis'
    print(list_directory_contents(path))
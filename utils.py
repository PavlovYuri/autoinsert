

def get_answer(data):
    text = ""
    for result in data["results"]:
        text += result["text"]

    answer = {
        "text": text
    }
    return answer
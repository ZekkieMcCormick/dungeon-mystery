#AI Generated
import execjs

def callJavascript(fileName, functionName, parameter):
    # Read the JavaScript file
    with open(fileName, 'r') as file:
        js_code = file.read()

    # Compile the JavaScript code
    js_context = execjs.compile(js_code)

    # Call the JavaScript function with an argument
    return js_context.call(functionName, parameter)
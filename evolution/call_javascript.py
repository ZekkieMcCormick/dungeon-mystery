#AI Generated
import execjs

def callJavascript(fileName, functionName, parameter, output = False):
    # Read the JavaScript file
    with open(fileName, 'r') as file:
        js_code = file.read()

    # Compile the JavaScript code with the modified console object
    js_context = execjs.compile(js_code)

    # Call the JavaScript function with an argument
    if output:
        return js_context.call(functionName, parameter)[1]
    return js_context.call(functionName, parameter)[0]
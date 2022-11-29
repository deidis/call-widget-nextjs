## Call Widget
This project allows website developers to easily implement a way for users to contact their company.

Under the hood, it uses NextJS for the frontend which is then wrapped by an ``iframe`` element and
placed in the website's DOM. The developer can communicate with the iframe by using the API
provided in the ``widget.js`` file.

## Usage
- Add the ``widget.js`` file to your website.
- Implement the ``onCallWidgetReady`` function.
  - This function passes a new ``CallWidget`` object in the parameter.
- Store the object in a variable and initialize the widget.

There is an example provided [here](https://github.com/deidis/call-widget-nextjs/tree/main/example).

## widget.js API

### onCallWidgetReady(widget)
Called by ``widget.js`` when it is ready to be initialized.

``widget:CallWidget`` A new CallWidget object that you can use to control the widget.

### init(title, buttonText)
Creates the iframe and overlay elements and adds them to the DOM.

``title:string`` The text to be used in the title text element of the widget.

``buttonText:string`` The text to be used in the button to initiate a call.

### openCallWidget()
Sets the display style of the widget to ``block``.

### closeCallWidget()
Sets the display style of the widget to ``none``.

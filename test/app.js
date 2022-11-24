const iframeId = "callWidgetIFrame";
const overlayId = "callWidgetOverlay";
const iframeUrl = "http://localhost:3000";

class CallWidget
{
    isOpen = true;
    title = "Title";
    buttonText = "Call Us";

    /**
     * Initializes the call widget by adding an IFrame element to the body
     * of the document. An `init` message is sent once the IFrame is loaded.
     * 
     * @param {string} title The title of the widget.
     * @param {string} buttonText The text of the call button.
     */
    init(title, buttonText)
    {
        this.title = title;
        this.buttonText = buttonText;

        var iframe = document.createElement("iframe");
        iframe.id = iframeId;
        iframe.src = iframeUrl;
        iframe.style.border = "None";
        iframe.style.width = "300px";
        iframe.style.height = "300px";
        iframe.style.position = "fixed";
        iframe.style.top = "50%";
        iframe.style.left = "50%";
        iframe.style.transform = "translate(-50%, -50%)";

        var overlay = document.createElement("div");
        overlay.id = overlayId;
        overlay.style.position = "absolute";
        overlay.style.top = "0";
        overlay.style.left = "0";
        overlay.style.right = "0";
        overlay.style.bottom = "0";
        overlay.style.height = "100%";
        overlay.style.width = "100%";
        overlay.style.backgroundColor = "rgba(0, 0, 0, .5)";
        overlay.onclick = () => this.closeCallWidget();

        overlay.appendChild(iframe);
        document.body.appendChild(overlay);

        window.addEventListener("message", this.onMessage);
    }

    onMessage(e)
    {
        if(e.origin !== iframeUrl) return;

        if(e.data == "done")
        {
            let iframe = document.getElementById(iframeId);
            iframe.contentWindow.postMessage({
                "message": "init",
                "contents": {
                    "title": this.title,
                    "buttonText": this.buttonText
                }
            }, "*");
            return;
        }
        else if(e.data["message"] == "openState")
        {
            this.isOpen = e.data["contents"];

            if(!this.isOpen)
            {
                var overlay = document.getElementById(overlayId);
                overlay.style.display = "none";
            }
        }
    }

    openCallWidget()
    {
        var overlay = document.getElementById(overlayId);
        overlay.style.display = "block";
    }

    closeCallWidget()
    {
        var overlay = document.getElementById(overlayId);
        overlay.style.display = "none";
    }
}

onCallWidgetReady(new CallWidget())
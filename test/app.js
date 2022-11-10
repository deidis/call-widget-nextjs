const iframeId = "callWidgetIFrame";
const overlayId = "callWidgetOverlay";
const iframeUrl = "http://localhost:3000";

var isOpen = true;

/**
 * Initializes the call widget by adding an IFrame element to the body
 * of the document. An `init` message is sent once the IFrame is loaded.
 * 
 * @param {string} title The title of the widget.
 * @param {string} buttonText The text of the call button.
 */
function initCallWidget(title, buttonText)
{
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
    overlay.onclick = () => closeCallWidget();

    overlay.appendChild(iframe);

    document.body.appendChild(overlay);

    function onMessage(e)
    {
        if(e.origin !== iframeUrl) return;

        if(e.data == "done")
        {
            iframe.contentWindow.postMessage({
                "message": "init",
                "contents": {
                    "title": title,
                    "buttonText": buttonText
                }
            }, "*");
            return;
        }
        else if(e.data["message"] == "openState")
        {
            isOpen = e.data["contents"];

            if(!isOpen) closeCallWidget();
        }
    }

    window.addEventListener("message", onMessage);
}

function openCallWidget()
{
    var overlay = document.getElementById(overlayId);
    overlay.style.display = "block";
}

function closeCallWidget()
{
    var overlay = document.getElementById(overlayId);
    overlay.style.display = "none";
}
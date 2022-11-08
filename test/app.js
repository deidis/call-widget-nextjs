const iframeId = "callWidgetIFrame";
const iframeUrl = "http://localhost:3000";

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

    document.body.appendChild(iframe);

    function onMessage(e)
    {
        if(e.origin !== iframeUrl) return;

        iframe.contentWindow.postMessage({
            "message": "init",
            "contents": {
                "title": title,
                "buttonText": buttonText
            }
        }, "*");

        window.removeEventListener("message", onMessage);
    }

    window.addEventListener("message", onMessage);
}

function openCallWidget()
{
    
}

function closeCallWidget()
{

}
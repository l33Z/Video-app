import { clsx } from 'clsx'
import html2canvas from 'html2canvas'
import { toast } from 'sonner'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export const commonErrorCatch = error => {
  let msg = 'Something went wrong'

  const getErrorMessage = err => {
    if (typeof err == 'object') {
      Object.keys(err).forEach(key => {
        if (key === 'error' && typeof err[key] == 'object') {
          msg = getErrorMessage(err[key])
        } else if (key === 'errorMsg' || key === 'message' || key === 'msg') {
          msg = err[key]
        }
      })
    } else if (typeof err == 'string') {
      msg = err[key]
    }
    return msg
  }

  const errMsg = getErrorMessage(error)

  console.log('err ==> ', error)
  console.log('msg ==> ', errMsg)
  toast.error(errMsg)
}

export const copyContent = async text => {
  try {
    await navigator.clipboard.writeText(text)
    toast.success('Link copied')
  } catch (err) {
    toast.error('Failed to copy: ')
    console.error('Failed to copy: ', err)
  }
}

export const takeScreenShot = async () => {
  // const canvas = document.createElement("canvas");
  // const context = canvas.getContext("2d");
  // const video = document.createElement("video");

  // function takeScreenshot() {
  //   var screenshot = document.documentElement
  //     .cloneNode(true);
  //   screenshot.style.pointerEvents = 'none';
  //   screenshot.style.overflow = 'hidden';
  //   screenshot.style.webkitUserSelect = 'none';
  //   screenshot.style.mozUserSelect = 'none';
  //   screenshot.style.msUserSelect = 'none';
  //   screenshot.style.oUserSelect = 'none';
  //   screenshot.style.userSelect = 'none';
  //   screenshot.dataset.scrollX = window.scrollX;
  //   screenshot.dataset.scrollY = window.scrollY;
  //   var blob = new Blob([screenshot.outerHTML], {
  //     type: 'text/html'
  //   });
  //   return blob;
  // }

  // function generate() {
  //   window.URL = window.URL || window.webkitURL;
  //   // window.open(window.URL
  //   //   .createObjectURL(takeScreenshot()));

  //   const downloadLink = document.createElement('a');
  //   const f = takeScreenshot()
  //   console.log('sss ==> ', f);
  //   downloadLink.href = window.URL.createObjectURL(f);
  //   downloadLink.download = 'screenshot.html';

  //   // Append the link to the document and trigger a click event
  //   document.body.appendChild(downloadLink);
  //   downloadLink.click();

  //   // Remove the temporary link from the document
  //   document.body.removeChild(downloadLink);
  // }

  // generate()
  // try {
  //   const captureStream = await navigator.mediaDevices.getDisplayMedia();
  //   video.srcObject = captureStream;
  //   context.drawImage(video, 0, 0);
  //   const frame = canvas.toDataURL("image/png");
  //   captureStream.getTracks().forEach(track => track.stop());
  //   // window.location.href = frame;

  //   // Create a temporary link element to download the screenshot
  //   const downloadLink = document.createElement('a');
  //   downloadLink.href = frame;
  //   downloadLink.download = 'screenshot.png';

  //   // Append the link to the document and trigger a click event
  //   document.body.appendChild(downloadLink);
  //   downloadLink.click();

  //   // Remove the temporary link from the document
  //   document.body.removeChild(downloadLink);

  //   toast.success('Successfully captured')
  // } catch (err) {
  //   console.error("Error: " + err)
  //   commonErrorCatch(err);
  // }

  // Select the HTML element you want to capture
  const elementToCapture = document.body

  // Use HTML2Canvas to capture the content of the element
  html2canvas(elementToCapture).then(function (canvas) {
    // Convert the canvas to an image data URL
    const imageDataURL = canvas.toDataURL('image/png')

    // Create a temporary link element to download the screenshot
    const downloadLink = document.createElement('a')
    downloadLink.href = imageDataURL
    downloadLink.download = 'screenshot.png'

    // Append the link to the document and trigger a click event
    document.body.appendChild(downloadLink)
    downloadLink.click()

    // Remove the temporary link from the document
    document.body.removeChild(downloadLink)

    toast.success('Successfully captured')
  })
}

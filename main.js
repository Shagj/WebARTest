import {loadGLTF, loadVideo} from "./loader.js";
import {mockWithVideo} from './camera-mock.js';
import {createChromaMaterial} from './chroma-video.js';
const THREE = window.MINDAR.IMAGE.THREE;

document.addEventListener('DOMContentLoaded', () => {

  let vide = null;
  const init = async() => {
    video = await loadVideo("./video.mp4");
    video.play();
    video.pause();
  }


  const start = async() => {
   // mockWithVideo('../../assets/mock-videos/course-banner1.mp4');
    
    const mindarThree = new window.MINDAR.IMAGE.MindARThree({
      container: document.body,
      imageTargetSrc: './course-banner.mind',
    });
    const {renderer, scene, camera} = mindarThree;

    const video = await loadVideo("./video.mp4");
    const texture = new THREE.VideoTexture(video);

    const geometry = new THREE.PlaneGeometry(1, 1080/1920);
    //const material = new THREE.MeshBasicMaterial({map: texture});
    const material = createChromaMaterial(texture, 0x00ff00);
    const plane = new THREE.Mesh(geometry, material);

    plane.rotation.x = Math.PI / 2;
    plane.rotation.y = 0;
    plane.scale.multiplyScalar(3);
    const anchor = mindarThree.addAnchor(0);
    anchor.group.add(plane);

    anchor.onTargetFound = () => {
      video.play();
    }
    anchor.onTargetLost = () => {
      video.pause();
    }

    await mindarThree.start();
    renderer.setAnimationLoop(() => {
      renderer.render(scene, camera);
    });
  }


  
  //start();

  const button = document.createElement("button");
  button.textContent = "Эхлэх"
  button.addEventListener("click", start);
  //document.body.appendChild(button);
  document.getElementById("addButton").appendChild(button);
});

// JavaScript Document

/* -------------------------------------------------- //
    概要欄 Three.js 球体ワイヤーフレーム
// -------------------------------------------------- */
function overviewBackground() {
    let count = 0;
    // canvas
    const wrap = document.getElementsByClassName('overview-Background')[0],
          canvas = document.getElementById('overview-Canvas');
    let w = wrap.clientWidth / 4,
        h = wrap.clientHeight / 4;
    // Renderer
    const renderer = new THREE.WebGLRenderer({
        'canvas': canvas,
        'alpha': true
    });
    renderer.setSize( w, h );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setClearColor( 0x000000, 0 );
    // Scene
    const scene = new THREE.Scene();
    // camera
    const camera = new THREE.PerspectiveCamera( 45, w / h, 1, 10000 );
    camera.position.set( 0, 0, 1000 );
    // 
    const geometry = new THREE.SphereGeometry( 400, 12, 12 );
    const material = new THREE.MeshPhongMaterial( {
        emissive : 0xFFFFFF,
        wireframe: true,
    } );
    // Mesh
    const mesh = new THREE.Mesh(geometry, material);
    // シーンに追加
    scene.add(mesh);

    const geometry2 = new THREE.SphereGeometry( 380, 40,40  );
    const material2 = new THREE.MeshPhongMaterial( {
        emissive : 0x001631,
    } );
    // Mesh
    const mesh2 = new THREE.Mesh(geometry2, material2);
    // シーンに追加
    scene.add(mesh2);


    const directionalLight = new THREE.DirectionalLight( 0xFFFFFF );
    directionalLight.position.set(1, 1, 1);
    // シーンに追加
    scene.add(directionalLight);

    renderer.render(scene, camera);

    function animate() {
        requestAnimationFrame( animate );
        if ( count === 0 ) {
            count = 4;
            // オブジェクトを回転
            mesh.rotation.y += 0.01;
            mesh.rotation.x += 0.003;

            // レンダリング
            renderer.render( scene, camera );
        }
        count--;
    }
    animate();
    
    let timer;
    function debounce() { 
        clearTimeout( timer );
        timer = setTimeout( function() {
            w = wrap.clientWidth / 4,
            h = wrap.clientHeight / 4;
            renderer.setPixelRatio( window.devicePixelRatio );
            renderer.setSize( w, h );
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
        }, 300 );
    }    
    window.addEventListener('resize', debounce );
}
overviewBackground();
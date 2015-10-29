import THREE from 'three';
import OrbitControlsModule from 'three-orbit-controls';

window.THREE = THREE;

var OrbitControls = OrbitControlsModule(THREE);

var container, stats;

var camera, controls, scene, renderer, light;

var cross;

var foo = function(points) {
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
  camera.position.set(0, 0, 50);

  scene = new THREE.Scene();

  setUpControls();

  var material = new THREE.LineBasicMaterial({
    color: 0x0000ff
  });

  var geometry = new THREE.Geometry();
  // X, Y, Z
  // Lat, Long, Elevation
  points
    .map(point => (
      new THREE.Vector3(point.lat - 50, point.long, point.elevation * 0.0001)
    ))
    .forEach(vector3 => geometry.vertices.push(vector3));

    // geometry.vertices.push(new THREE.Vector3(-10, 0, 0));
    // geometry.vertices.push(new THREE.Vector3(0, 10, 0));
    // geometry.vertices.push(new THREE.Vector3(10, 0, 0));

    var line = new THREE.Line(geometry, material);
    scene.add(line);

  // camera.lookAt(points[0]);
}

var debugaxis = function(axisLength){
    //Shorten the vertex function
    function v(x,y,z){
            return new THREE.Vector3(x,y,z);
    }

    //Create axis (point1, point2, colour)
    function createAxis(p1, p2, color){
            var line, lineGeometry = new THREE.Geometry(),
            lineMat = new THREE.LineBasicMaterial({color: color, lineWidth: 1});
            lineGeometry.vertices.push(p1, p2);
            line = new THREE.Line(lineGeometry, lineMat);
            scene.add(line);
    }

    createAxis(v(-axisLength, 0, 0), v(axisLength, 0, 0), 0xFF0000);
    createAxis(v(0, -axisLength, 0), v(0, axisLength, 0), 0x00FF00);
    createAxis(v(0, 0, -axisLength), v(0, 0, axisLength), 0x0000FF);
};

function init() {
  camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 1000 );
  camera.position.z = 500;

  scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2( 0xcccccc, 0.002 );

  var geometry = new THREE.CylinderGeometry( 0, 10, 30, 4, 1 );
  var material =  new THREE.MeshPhongMaterial( { color:0xffffff, shading: THREE.FlatShading } );

  for ( var i = 0; i < 500; i ++ ) {
    var mesh = new THREE.Mesh( geometry, material );
    mesh.position.x = ( Math.random() - 0.5 ) * 1000;
    mesh.position.y = ( Math.random() - 0.5 ) * 1000;
    mesh.position.z = ( Math.random() - 0.5 ) * 1000;
    mesh.updateMatrix();
    mesh.matrixAutoUpdate = false;
    scene.add( mesh );
  }


  // lights

  light = new THREE.DirectionalLight( 0xffffff );
  light.position.set( 1, 1, 1 );
  scene.add( light );

  light = new THREE.DirectionalLight( 0x002288 );
  light.position.set( -1, -1, -1 );
  scene.add( light );

  light = new THREE.AmbientLight( 0x222222 );
  scene.add( light );


  // renderer

  renderer = new THREE.WebGLRenderer( { antialias: false } );
  renderer.setClearColor( scene.fog.color );
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );

  setUpControls();

  container = document.body;
  container.appendChild( renderer.domElement );

  // stats = new Stats();
  // stats.domElement.style.position = 'absolute';
  // stats.domElement.style.top = '0px';
  // stats.domElement.style.zIndex = 100;
  // container.appendChild( stats.domElement );

  //

  window.addEventListener( 'resize', onWindowResize, false );
  //

  render();
}

var setUpControls = function() {
  controls = new OrbitControls(camera);
  controls.addEventListener('change', render);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight );

  controls.handleResize();

  render();
}

function animate() {
  requestAnimationFrame( animate );
  controls.update();
}

function render() {
  renderer.render(scene, camera);
}

export default function(points) {
  // init();
  foo(points);
  //To use enter the axis length
  debugaxis(100);
  animate();
  render();
}

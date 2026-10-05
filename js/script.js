const toggleButton = document.getElementById('dark-mode-toggle');
const body = document.body;

if (localStorage.getItem('theme') === 'dark') {
  body.classList.add('dark-mode');
  toggleButton.textContent = 'Light Mode';
}

toggleButton.addEventListener('click', function() {
  body.classList.toggle('dark-mode');

  if (body.classList.contains('dark-mode')) {
    localStorage.setItem('theme', 'dark');
    toggleButton.textContent = 'Light Mode';
  } else {
    localStorage.setItem('theme', 'light');
    toggleButton.textContent = 'Dark Mode';
  }
});

const slideImage = document.getElementById('slide-image');

if (slideImage) {
  const slideCaption = document.getElementById('slide-caption');
  const prevButton = document.getElementById('prev-slide');
  const nextButton = document.getElementById('next-slide');

  const slides = [
    {
      src: 'images/loveofmylife.jpg',
      alt: 'My fiancée and I together at a wedding in the mountains.',
      caption: 'Us at a wedding in the mountains'
    },
    {
      src: 'images/proposal.jpeg',
      alt: 'Me down on one knee proposing to my fiancée.',
      caption: 'March 15th, 2026: She said yes!'
    },
    {
      src: 'images/pitcher.jpeg',
      alt: 'Me pitching at a slo-pitch game.',
      caption: 'On the mound at slo-pitch'
    }
  ];

  let currentSlide = 0;

  const showSlide = function(number) {
    if (number >= slides.length) {
      currentSlide = 0;
    } else if (number < 0) {
      currentSlide = slides.length - 1;
    } else {
      currentSlide = number;
    }

    slideImage.src = slides[currentSlide].src;
    slideImage.alt = slides[currentSlide].alt;
    slideCaption.textContent = 'Photo ' + (currentSlide + 1) + ' of ' + slides.length + ': ' + slides[currentSlide].caption;
  };

  nextButton.addEventListener('click', function() {
    showSlide(currentSlide + 1);
  });

  prevButton.addEventListener('click', function() {
    showSlide(currentSlide - 1);
  });
}

const mapElement = document.querySelector('gmp-map');

if (mapElement) {
  (g=>{var h,a,k,p="The Google Maps JavaScript API",c="google",l="importLibrary",q="__ib__",m=document,b=window;b=b[c]||(b[c]={});var d=b.maps||(b.maps={}),r=new Set,e=new URLSearchParams,u=()=>h||(h=new Promise(async(f,n)=>{await (a=m.createElement("script"));e.set("libraries",[...r]+"");for(k in g)e.set(k.replace(/[A-Z]/g,t=>"_"+t[0].toLowerCase()),g[k]);e.set("callback",c+".maps."+q);a.src=`https://maps.${c}apis.com/maps/api/js?`+e;d[q]=f;a.onerror=()=>h=n(Error(p+" could not load."));a.nonce=m.querySelector("script[nonce]")?.nonce||"";m.head.append(a)}));d[l]?console.warn(p+" only loads once. Ignoring:",g):d[l]=(f,...n)=>r.add(f)&&u().then(()=>d[l](f,...n))})({
    key: "AIzaSyDXlrBM6NAbJGfYZKW5yblw5Ow3NNNmgLY"
  });

  async function init() {
    const [{ AdvancedMarkerElement, PinElement }, { InfoWindow, Circle }] = await Promise.all([
      google.maps.importLibrary('marker'),
      google.maps.importLibrary('maps'),
    ]);

    const innerMap = mapElement.innerMap;

    innerMap.setOptions({
      mapTypeControl: true,
      mapTypeControlOptions: {
        style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
        position: google.maps.ControlPosition.TOP_CENTER,
      },
    });

    const pin = new PinElement({
      background: '#ff6a00',
      borderColor: '#13294b',
      glyphColor: 'white',
      scale: 1.3,
    });

    const marker = new AdvancedMarkerElement({
      map: innerMap,
      position: mapElement.center,
      title: 'Tangled Roots',
      content: pin.element,
      gmpClickable: true,
    });

    const infoWindow = new InfoWindow({
      content: '<h3>Tangled Roots</h3><p>50374 Range Road 244<br>Leduc County, AB</p><p>Our wedding venue!</p>',
    });

    marker.addListener('gmp-click', () => {
      infoWindow.open({
        anchor: marker,
        map: innerMap,
      });
    });

    new Circle({
      map: innerMap,
      center: { lat: 53.327, lng: -113.458 },
      radius: 800,
      strokeColor: '#ff6a00',
      strokeWeight: 2,
      fillColor: '#ff6a00',
      fillOpacity: 0.15,
    });
  }
  void init();
}

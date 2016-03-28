var gmail;

var themagicapikey;

function refresh(f) {
  if( (/in/.test(document.readyState)) || (undefined === Gmail) ) {
    setTimeout('refresh(' + f + ')', 2);
  } else {
    f();
  }
}

function main() {
    console.log('main script');
}

refresh(main);

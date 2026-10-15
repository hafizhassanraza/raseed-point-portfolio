export function WindowFrame({ src, srcSet, sizes, alt }) {
  return (
    <div className="window">
      <img src={src} srcSet={srcSet} sizes={sizes} alt={alt} width="1440" height="900" />
    </div>
  );
}

export function Showcase({ src, srcSet, sizes, alt, phone, phoneAlt }) {
  return (
    <div className="showcase">
      <WindowFrame src={src} srcSet={srcSet} sizes={sizes} alt={alt} />
      {phone ? <Phone src={phone} alt={phoneAlt} /> : null}
    </div>
  );
}

export function Laptop({ src, alt }) {
  return (
    <div className="laptop">
      <div className="laptop-lid">
        <div className="laptop-screen">
          <img src={src} alt={alt} />
        </div>
      </div>
      <div className="laptop-base" aria-hidden="true">
        <i />
      </div>
    </div>
  );
}

export function Phone({ src, alt }) {
  return (
    <div className="phone">
      <span className="phone-speaker" aria-hidden="true" />
      <div className="phone-screen">
        <img src={src} alt={alt} />
      </div>
    </div>
  );
}

export function Laptop({ src, alt }) {
  return (
    <div className="laptop">
      <div className="laptop-lid">
        <div className="laptop-bar" aria-hidden="true">
          <i />
        </div>
        <div className="laptop-screen">
          <img src={src} alt={alt} />
        </div>
      </div>
      <div className="laptop-base" aria-hidden="true" />
    </div>
  );
}

export function Phone({ src, alt }) {
  return (
    <div className="phone">
      <div className="phone-screen">
        <img src={src} alt={alt} />
      </div>
    </div>
  );
}

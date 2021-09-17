import React, {useState} from "react";

function RenderSmoothImage({src, alt, className, width, height}) {
    const [imageLoaded, setImageLoaded]=React.useState(false);
	const [isValidSrc, setIsValidSrc] = React.useState(!!src);
    return (
      <div className="smooth-image-wrapper">
        {isValidSrc ? (
        <img
          src={src}
          alt={alt}
          className={`smooth-image ${className} image-${
            imageLoaded ? 'visible' :  'hidden'
          }`}
          onLoad={()=> setImageLoaded(true)}
		  width={width}
		  height={height}
          onError={() => setIsValidSrc(false)}
          />
        ) : (
          <div className="smooth-no-image">{alt}</div>
        )}
        {isValidSrc && !imageLoaded && (
          <div className="smooth-preloader">
            <span className="loader" />
          </div>
        )}
      </div>
    )
  }
  
  export default RenderSmoothImage;
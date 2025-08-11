export default function Flyer({ joke, visible }) {
    return (
      <div
        id="customFlyer"
        className=" min-h-screen grid place-content-center fixed top-0 left-0 z-50"
        style={{ display: visible ? "block" : "none" } }
      >
        <div className="flyer-container">
          <div className="flyer-header">
          
          </div>
          <div className="flyer-content">
            <div className="comment-place">
              <blockquote id="flyer-comment" className="text-center">{joke}</blockquote>
            </div>
            <div className="flyer-footer">
              <p className="flyer-link text-sm text-center">😂 VISTE QUE CHISTE APP 😂 </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
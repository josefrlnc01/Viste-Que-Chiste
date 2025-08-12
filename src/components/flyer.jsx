export default function Flyer({ joke, visible }) {
    return (
      <div
        id="customFlyer"
        className=" min-h-screen grid place-content-center fixed top-0 left-0 z-50"
        style={{ display: visible ? 'block'  : 'none' } }
      >
        <div className="flyer-container">
          <div className="flyer-header">
          
          </div>
          <div className="flyer-content bg-yellow-400">
            <div className="comment-place mt-14">
              <blockquote id="flyer-comment" className="text-center text-2xl">{joke}</blockquote>
            </div>
            <div className="flyer-footer min-w-full bg-yellow-300  p-8 rounded-md self-end">
              <p className="flyer-link text-sm text-center ">😂 VISTE QUE CHISTE APP 😂 </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
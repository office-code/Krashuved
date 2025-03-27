// import { useEffect } from "react"; 
// import { useLocation } from "react-router-dom"; 
  
// export default function GoToTop() { 
//   const routePath = useLocation(); 
//   const onTop = () => { 
//     window.scrollTo(0, 0); 
//   } 
//   useEffect(() => { 
//     onTop() 
//   }, [routePath]); 
  
//   return null; 
// }

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const GoToTop = () => {
  // Extracts pathname property(key) from an object
  const { pathname } = useLocation();

  // Automatically scrolls to top whenever pathname changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
}

export default GoToTop;
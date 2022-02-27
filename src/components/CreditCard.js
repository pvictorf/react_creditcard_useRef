import React, { useCallback, useEffect, useRef } from 'react';

export const CreditCard = ({name = "Paulo V Ferreira"}) => {
  const cardEl = useRef(null);
  const cardTransitionRef = useRef();
    
  function cardEffect(event) {
    const card = cardEl.current;
    if(card) {
      const cardWidth = card.offsetWidth
      const cardHeight = card.offsetHeight
      const centerX = card.offsetLeft + cardWidth / 2
      const centerY = card.offsetTop + cardHeight / 2
      const positionX = event.clientX - centerX
      const positionY = event.clientY - centerY
      const perspective = 50;

      const rotateX = ((+1) * perspective * positionY / (cardHeight / 2)).toFixed(2)
      const rotateY = ((-1) * perspective * positionX / (cardHeight / 2)).toFixed(2)
      
      card.style.transform = `perspective(500px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)` 
    }
  }

  const cardTransition = useCallback((milleseconds = 400) => {
    const card = cardEl.current
    if(card) {  
      if(cardTransitionRef.current) clearTimeout(cardTransitionRef.current);
      card.style.transition = `transform ${milleseconds}ms`
      cardTransitionRef.current = setTimeout(() => { card.style.transition = ''}, milleseconds) 
    }
  }, [])

  const cardEnter = useCallback(() => {
    cardTransition()
  }, [cardTransition]) 

  const cardBack = useCallback((event) => {
    const card = cardEl.current
    if(card) {
      card.style.transform = `perspective(500px) rotateX(0deg) rotateY(0deg)`
      cardTransition()
    } 
  }, [cardTransition])

  useEffect(() => {
    cardEl.current?.addEventListener('mousemove', cardEffect)
    cardEl.current?.addEventListener('mouseenter', cardEnter)  
    cardEl.current?.addEventListener('mouseleave', cardBack)    
  }, [cardEnter, cardBack])

  return (
    <div className='creditcard' ref={cardEl} >
      <div className='creditcard-header'>
        <div className='chip'></div>
      </div>
      <div className='creditcard-footer'> 
        <p className='creditcard-name'>{name}</p>
      </div>
    </div>
  );
}

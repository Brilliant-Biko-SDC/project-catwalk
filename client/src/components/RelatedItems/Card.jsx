import React, { useState } from 'react';
import styled from 'styled-components';
import Stars from '../SharedComponents/Stars';
import Heart from './IconHeart';
import OutfitList from './OutfitList';

const H = {};

H.Wrapper = styled.div`
  display: flex;
  align-items: center;
  z-index: 1;
  position: absolute;
  margin-left: 205px;
  margin-top: 25px;
`;

H.BackHeartDiv = styled.button`
  display: flex;
  position: absolute;
  color: ${(props) => (props.selected ? 'coral' : 'gray')};
  border: none;
  background: none;

  &:hover {
    opacity: 0.6;
    cursor: pointer;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-width: 250px;
  max-width: 250px;
  min-height: 500px;
  border-radius: 4px;
  border: solid 2px #767676;
  padding: 5px;
  margin: 1rem;
  position: relative;

  &:hover {
    cursor: pointer;
  }
`;

const Name = styled.p`
  font-family: 'Montserrat'
  color: gray;
  font-size: 20px;
  font-weight: 200;
  text-align: left;
  flex-basis:0.1rem;
  margin-top: -35px;
`;

const Description = styled.p`
  color: gray;
  text-align:left;
  margin-top: -35px;
`;

const Category = styled.p`
  color: gray;
  text-align: left;
  margin-top:-20px;
`;

const Image = styled.img`
  border-radius: 5px;
  min-width: 230px;
  max-width: 250px;
  height: 350px;
  object-fit: cover;
`;

const Line = styled.hr`
  color: black;
  width: 100%;
  margin-top: -10px;
`;

const Modal = styled.div`
  position: fixed;
  z-index: 2;
  inset: 0px;
  width: 100%;
  height: 100%;
  overflow: auto;
  transition-duration: 4s;
  background-color: rgba(0,0,0,0.4);
  display: flex;
  justify-content: center;
`;

const StyledTable = styled.table`
  border-radius: 22px;
  position: fixed;
  background: white;
  min-width: 30%;
  min-height: 30%;
  padding: 2%;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  z-index: 2;
  max-height: 80vh;
  overflow: auto;
  flex-direction: column;
  justify-content: stretch;
  border-spacing: 15px;
  .th{
     padding: 1px 10px;
  }
`;

// The related product id is passed down from cardList
// Perform a get request in the child function to display the
// Correct photo that corresponds with the data
const Card = ({
  // eslint-disable-next-line react/prop-types
  itemName, price, image, ratings, category, product, features,
}) => {
  const [currentCompare, setCurrentCompare] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const addOutfit = () => {
    <H.BackHeartDiv selected>
      <Heart />
    </H.BackHeartDiv>;
  };

  // Check mark
  // if (recommend) {
  //   recommended = (
  //     <span className="leftSide">
  //       <span className="green">
  //         &#10003;
  //       </span>
  //       {' I recommend this product'}
  //     </span>
  //   );
  // }

  let modal;

  if (showModal) {
    modal = (
      <Modal onClick={() => { setShowModal(!showModal); }}>
        <StyledTable>
          <tr>
            <th>{itemName}</th>
            <th>Description</th>
            <th>{product.name}</th>
          </tr>
          <tr>
          </tr>
        </StyledTable>
      </Modal>
    );
  }
  const compare = () => {
    setCurrentCompare(features);
  };

  // pass data that was selected to outfitList
  return (
    <>
      {modal}
      <Wrapper data-testid="card">
        <H.Wrapper>
          <H.BackHeartDiv className="outfit" onClick={addOutfit}>
            <Heart />
          </H.BackHeartDiv>
        </H.Wrapper>
        <Image src={image} alt="empty" onClick={() => { compare(); setShowModal(!showModal); }} />
        <div><Line /></div>
        <Category>{category}</Category>
        <Name>{itemName}</Name>
        <Description>
          $
          {price}
        </Description>
        <Stars stars={ratings} />
      </Wrapper>
    </>
  );
};

export default Card;

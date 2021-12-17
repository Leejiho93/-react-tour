import React from 'react';
import { DetailItemProps } from '../../modules/detail';

const TourCulture = ({ item }: DetailItemProps) => {
  const {
    accomcountculture,
    chkbabycarriageculture,
    chkcreditcardculture,
    chkpetculture,
    discountinfo,
    infocenterculture,
    parkingculture,
    parkingfee,
    restdateculture,
    usefee,
    usetimeculture,
    scale,
    spendtime,
  } = item.intro;
  return (
    <>
      <ul>
        {!accomcountculture ? null : <li>{accomcountculture}</li>}
        {!chkbabycarriageculture ? null : <li>{chkbabycarriageculture}</li>}
        {!chkcreditcardculture ? null : <li>{chkcreditcardculture}</li>}
        {!chkpetculture ? null : <li>{chkpetculture}</li>}
        {!discountinfo ? null : <li>{discountinfo}</li>}
        {!infocenterculture ? null : <li>{infocenterculture}</li>}
        {!parkingculture ? null : <li>{parkingculture}</li>}
        {!parkingfee ? null : <li>{parkingfee}</li>}
        {!restdateculture ? null : <li>{restdateculture}</li>}
        {!usefee ? null : <li>{usefee}</li>}
        {!usetimeculture ? null : <li>{usetimeculture}</li>}
        {!scale ? null : <li>{scale}</li>}
        {!spendtime ? null : <li>{spendtime}</li>}
      </ul>
    </>
  );
};

export default TourCulture;

import React, { useState } from 'react';
import './NewChat.css'

import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default ({user, chatlist, show, setShow}) => {

    const [list, setList] = useState([
        {id: 123, avatar: 'https://cdn.bhdw.net/im/k-da-popstar-seraphine-lol-league-of-legends-papel-de-parede-66775_w635.jpg', name: 'Seraphine'},
        {id: 123, avatar: 'https://cdn.lolalytics.com/generated/champion280px/garen.jpg', name: 'Garen'}, 
        {id: 123, avatar: 'https://www.mobafire.com/images/champion/square/ezreal.png', name: 'Ezreal'}, 
        {id: 123, avatar: 'https://www.meme-arsenal.com/memes/9f40f9f306e9d191f34db9a270df7cd2.jpg', name: 'Morgana'},
    ])

    const handleClose = () => {
        setShow(false);
    }

    return (
        <div className='newChat' style={{left: show ? 0 : -415}}>
            <div className='newChat--head'>
                <div onClick={handleClose} className='newChat--backbutton'>
                    <ArrowBackIcon style={{color: '#FFFFFF'}} />
                </div>
                <div className='newChat--headtitle'>Nova Conversa</div>
            </div>
            <div className='newChat--list'>
                {list.map((item, key) =>(
                    <div className='newChat--item' key={key}>
                        <img className='newChat--itemavatar' src={item.avatar} alt='' />
                        <div className='newChat--itemname'>{item.name}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}
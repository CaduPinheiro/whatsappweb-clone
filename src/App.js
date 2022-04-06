import React, { useState, useEffect } from 'react';
import './App.css';

import ChatListItem from './components/ChatListItem';
import ChatIntro from './components/ChatIntro';
import ChatWindow from './components/ChatWindow';
import NewChat from './components/NewChat';
import Login from './components/Login';

import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import ChatIcon from '@mui/icons-material/Chat';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';

export default () => {

  const [chatlist, setChatList] = useState([
    {chatId: 1, title: 'Seraphine', image: 'https://cdn.bhdw.net/im/k-da-popstar-seraphine-lol-league-of-legends-papel-de-parede-66775_w635.jpg', msg: 'M U T A D A'},
    {chatId: 2, title: 'Garen', image: 'https://cdn.lolalytics.com/generated/champion280px/garen.jpg', msg: 'Cola no TOP que é GG'}, 
    {chatId: 3, title: 'Ezreal', image: 'https://www.mobafire.com/images/champion/square/ezreal.png', msg: 'Vc tá livre na sexta?'}, 
    {chatId: 4, title: 'Morgana', image: 'https://www.meme-arsenal.com/memes/9f40f9f306e9d191f34db9a270df7cd2.jpg', msg: 'Meu stun é melhor q o teu, otaria!'}, 
  ]);
  const [activeChat, setActiveChat] = useState({});
  const [user, setUser] = useState(
    {id: 1234, avatar: 'https://www.personality-database.com/profile_images/4899.png'}
  );
  const [showNewChat, setShowNewChat] = useState(false)

  const handleNewChat = () => {
    setShowNewChat(true)
  }

  // const handleLoginData = async (u) => {
  //   let newUser = {
  //     id: u.uid,
  //     name: u.displayName,
  //     avatar: u.photoURL
  //   }
  //   setUser(newUser);
  // }
  
  // if(user === null) {
  //   return (<Login onReceive={handleLoginData} />);
  // }

  return (
    <div className='app-window'>
      <div className='sideBar'>
        <NewChat 
          chatlist={chatlist}
          user={user}
          show={showNewChat}
          setShow={setShowNewChat}
        />
        <header>
          <img className='header--avatar' src={user.avatar} alt="" />
          <div className='header--buttons'>
            <div className='header--btn'>
              <DonutLargeIcon style={{color: '#919191'}} />
            </div>
            <div onClick={handleNewChat} className='header--btn'>
              <ChatIcon style={{color: '#919191'}} />
            </div>
            <div className='header--btn'>
              <MoreVertIcon style={{color: '#919191'}} />
            </div>
          </div>
        </header>
         
        <div className='search'>
          <div className='search--input'>
            <SearchIcon fontSize='small' style={{color: '#919191'}} />
            <input type='search' placeholder='Procurar ou começar uma nova conversa' />
          </div>
        </div>
        
        <div className='chatlist'>
          {chatlist.map((item, key) => (
            <ChatListItem 
              active={activeChat.chatId === chatlist[key].chatId}
              key={key}
              data={item}
              onClick={()=>setActiveChat(chatlist[key])}
            />
          ))}
        </div>

      </div>
      <div className='contentarea'>
        {activeChat.chatId !== undefined &&
          <ChatWindow 
            user={user}
          />
        }
        {activeChat.chatId === undefined &&
          <ChatIntro />  
        }      
      </div>
    </div>
  )
}
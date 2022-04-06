import React, { useState, useEffect, useRef } from 'react';
import EmojiPicker from 'emoji-picker-react';
import './ChatWindow.css';

import MessageItem from './MessageItem';

import SearchIcon from '@mui/icons-material/Search';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import MicIcon from '@mui/icons-material/Mic';

export default ({user}) => {

    const body = useRef();
    
    let recognition = null;
    let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if(SpeechRecognition !== undefined) {
        recognition = new SpeechRecognition();
    }

    const [emojiOpen, setEmojiOpen] = useState(false);
    const [text, setText] = useState('');
    const [listening, setListening] = useState(false);
    const [list, setList] = useState([
        {author: 123, body: 'Oi, amiga!'}, 
        {author: 1234, body: 'Como vaaaai?'}, 
        {author: 123, body: 'Cansada de cantar nessa partida'},
        {author: 123, body: 'Usa logo a ult'}, 
        {author: 1234, body: 'Queria, mas tô sem mana'}, 
        {author: 123, body: 'Vixe!'},
        {author: 1234, body: 'A Katarina tá descendo!'}, 
        {author: 123, body: 'PQP! VC SÓ AVISA AGORA?'}, 
        {author: 1234, body: 'Corre, mulher!'},
        {author: 123, body: 'Tô correndo. Socorroooooo!'}, 
        {author: 1234, body: 'Para que tanto drama?'}, 
        {author: 123, body: 'Sobrevivi, isso que importa'},
        {author: 1234, body: 'Eu, hein!'}, 
        {author: 123, body: 'Tá achando ruim? Vem no bot!'}, 
        {author: 1234, body: 'Tu que feedou a MF inimiga. Te vira.'},
        {author: 123, body: 'M U T A D A'}
    ]);

    useEffect(() => {
        if(body.current.scrollHeight > body.current.offsetHeight){
            body.current.scrollTop = body.current.scrollHeight - body.current.offsetHeight;
        }
    }, [list]);

    const handleEmojiClick = (e, emojiObject) => {
        setText(text + emojiObject.emoji );
    }

    const handleOpenEmoji = () => {
        setEmojiOpen(true);
    }

    const handleCloseEmoji = () => {
        setEmojiOpen(false);
    }

    const handleMicClick = () => {
        if (recognition !== null) {

            recognition.onstart = () => {
                setListening(true);
            }
            recognition.onend = () => {
                setListening(false);
            }
            recognition.onresult = (e) => {
                setText(e.results[0][0].transcript)
            }

            recognition.start();

        }
    }

    const handleSendClick = () => {

    }

    return (
        <div className='chatWindow'>
            <div className='chatWindow--header'>

                <div className='chatWindow--headerinfo'>
                    <img className='chatWindow--avatar' src='https://cdn.bhdw.net/im/k-da-popstar-seraphine-lol-league-of-legends-papel-de-parede-66775_w635.jpg' alt=''/>
                    <div className='chatWindow--name'>Seraphine</div>
                </div>
                <div className='chatWindow--headerbuttons'>

                    <div className='chatWindow--btn'>
                        <SearchIcon style={{color: '#919191'}} />
                    </div>
                    <div className='chatWindow--btn'>
                        <AttachFileIcon style={{color: '#919191'}} />
                    </div>
                    <div className='chatWindow--btn'>
                        <MoreVertIcon style={{color: '#919191'}} />
                    </div>

                </div>
            </div>
            <div ref={body} className='chatWindow--body'>
                {list.map((item, key) => (
                    <MessageItem 
                        key = {key}
                        data = {item}
                        user={user}
                    />
                ))}
            </div>

            <div 
            className='chatWindow--emojiarea' 
            style={{height: emojiOpen ? '200px' : '0px'}}>
                <EmojiPicker 
                    onEmojiClick={handleEmojiClick}
                    disableSearchBar
                    disableSkinTonePicker
                />
            </div>

            <div className='chatWindow--footer'>

                <div className='chatWindow--pre'>

                    <div 
                        className='chatWindow--btn'
                        onClick={handleCloseEmoji}
                        style={{width: emojiOpen ? 40:0 }}
                    >
                        <CloseIcon style={{color: '#919191'}} />
                    </div>
                    
                    <div 
                        className='chatWindow--btn'
                        onClick={handleOpenEmoji}
                    >
                        <InsertEmoticonIcon style={{color: emojiOpen ? '#009688' : '#919191'}} />
                    </div>

                </div>
                <div className='chatWindow--inputarea'>
                    <input 
                        className='chatWindow--input' 
                        type="text" 
                        placeholder="Digite uma mensagem"
                        value={text}
                        onChange={e=>setText(e.target.value)}
                    />
                </div>
                <div className='chatWindow--pos'>
                    
                    {text === ''  &&
                        <div onClick={handleMicClick} className='chatWindow--btn'>
                            <MicIcon style={{color: listening ? '#126ECE' : '#919191'}} />
                        </div>
                    }
                    {text !== '' &&
                        <div onClick={handleSendClick} className='chatWindow--btn'>
                            <SendIcon style={{color: '#919191'}} />
                        </div>
                    }

                </div>

            </div>
        </div>
    )
}
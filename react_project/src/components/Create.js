import React, {useState} from 'react';
import env from '../env.json'
import {useParams} from 'react-router-dom';


function Create() {

    const [url, setUrl] = useState('');
    const [lineClass, setLineClass] = useState('');
    const [formClass, setFormClass] = useState('');


    let sendData =(obj) => {
        fetch(env.urlBackent, {
            method: 'POST',
            headers: {
               'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(obj)
        })
        .then(response => response.json())
        .then(response =>  {
            // console.log(response);
            if(response.result){
                setUrl(env.url  + '/'+ response.url)
                 
            }
        })
    }

    let loadDataFromForm =(event)=> {
        event.preventDefault();
                // console.log(event.target.elements.note.value);
        let note = event.target.elements.note.value;
        note = note.trim();
        if(note===''){
            alert('Fill the textarea');
            return false;
        }
        // console.log(note)
        sendData({"note" : note})
    }
    let newNote = () => {
        window.location.reload()
    }

    return (
        <div className={lineClass}> 
            <form className={formClass} onSubmit={loadDataFromForm}>
                <label htmlFor=''>Input note</label>
                <textarea name="note" id="note" defaultValue='test'></textarea>
                <button type='sumbit'>Create</button>
                <p>{url}</p>
            </form>
            <div className='lineClass'>
                {/* <div>{url}</div> */}
                 <button onClick={newNote}>Create new note</button> 

            </div>

        </div>
    );
}

export default Create;
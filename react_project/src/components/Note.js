
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import env from '../env.json'


function Note() {
    let { noteURL } = useParams();
    const [noteText, setNoteText] = useState('')
    const [lineClass, setLineClass] = useState('')
    const [formClass, setFormClass] = useState('hide');
    const [errorClass, setErrorClass] = useState('hide');

    useEffect(() => {
        if (noteURL !== undefined) {
            fetch(env.urlBackent, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify({ "url": noteURL })
            })
                .then(response => response.json())
                .then(response => {
                    // console.log(response);
                    if (response.result) {
                        setNoteText(response.note);
                        setLineClass('');
                        setFormClass('hide');
                        setErrorClass('hide')
                    }
                    else if (!response.result) {
                        console.log(response.result)

                        setLineClass('hide');
                        setFormClass('hide');
                        setErrorClass('')
                    }
                })
        }
        else {
            setLineClass('hide');
            setFormClass('');
            setErrorClass('hide')
        }
    }, [])
    function searchNote() {
        window.location.href = env.url;
    }
    function getNote(event) {
        event.preventDefault();
        console.log('does')

        let url = event.target.elements.url.value;
        console.log(url)

        url = url.trim();
        if (url === '') {
            alert('Fill gaps');
            return false
        }
       
            noteURL = url;
        window.location.href = env.url+'/'+url;
        
        


    }

    return (
        <div>

            <div className={lineClass}>
                <p>Note: </p>
                <div>{noteText}</div>
                <button onClick={searchNote}>Show one more time</button>
            </div>

            <div className={errorClass}>
                <p>An error acc ured</p>
            </div>
            <div className={formClass}>
                <form action="" onSubmit={getNote}>
                    <label>Input hash note</label>
                    <input type="text" name="url" id="url" className="form-control" />
                    <button type="submit"  className="btn btn-primary">Search this note</button>
                </form>
            </div>


        </div>

    );
}
export default Note;
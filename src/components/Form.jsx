import React, {useState} from 'react';
import Error from './Error'

const Form = ({setSearching}) => {

    const [word, setWord] = useState('');
    const [error, setError] = useState(false);

    const searchImages = e => {

        e.preventDefault();

        if(word.trim() === ''){
            setError(true);
            return;
        }
        setError(false);

        setSearching(word);
    }

    return (
        <form
            onSubmit = {searchImages}
        >
            <div className="row">
                <div className="form-group col-md-8">
                    <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Search an image, eg. universe or space"
                        onChange={e => setWord(e.target.value)}
                    />
                </div>
                <div className="form-group col-md-4">
                    <input
                        type="submit"
                        className="btn btn-lg btn-danger btn-block"
                        value="Search"
                    />
                </div>
            </div>

            {error 
            ? <Error message="All fileds are required."/>
            : null
         }
        </form>
    );
}

export default Form;
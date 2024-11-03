import {Link} from 'react-router-dom';

const MyFooter = () =>{
    return(
        <footer className='bg-dark p-5 text-white mt-5'>
            <div className='container'>
                <div className='row'>
                    <div className='col-xl-4'>
                        <h5 className='text-warning'> About Us </h5>
                        <p>
                            dsfsdfrdfeerfe f erf ewf e ewfe wf ewf ewf ewf ew few ew ew fewfew few few few few few
                            d dsfsdfrdfeerfe f erf ewf e ewfe wf ewf ewf ewf ew few ew ew fewfew few few few few f
                            sfsdfrdfeerfe f erf ewf e ewfe wf ewf ewf ewf ew few ew ew fewfew few few few few fewi
                            dsfsdfrdfeerfe f erf ewf e ewfe wf ewf ewf ewf ew few ew ew fewfew few few few few few
                            dsfsdfrdfeerfe f erf ewf e ewfe wf ewf ewf ewf ew few ew ew fewfew few few few few few
                        </p>
                    </div>

                    <div className='col-xl-5'>
                        <h5 className='text-warning'> Our Address </h5>
                        <p> #41, 2nd Cross, Outer rising road marathahalli bangalore 560037 </p>
                        <p> e-mail - contact@gmail.com </p>
                        <p> Mobile - +91 4543 53 5345 </p>
                    </div>

                    <div className='col-xl-3'>
                        <h5 className='text-warning'> In Social Media </h5>
                        <p> <i className='fab fa-facebook fa-lg'></i> www.facebook.com </p>
                        <p> <i className='fab fa-twitter fa-lg'></i> www.twitter.com </p>
                        <p> <i className='fab fa-linkedin fa-lg'></i> www.linkedin.com </p>
                        <p> <i className='fab fa-instagram fa-lg'></i> www.instagram.com </p>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default MyFooter
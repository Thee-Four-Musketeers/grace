import React, { useEffect } from 'react';
import { Col, Row, Image } from 'react-bootstrap';
import './About.css';

const AboutUs = ({ setHeaderClass }) => {

    useEffect(() => {
        setHeaderClass('about');
    }, []);

    return (
        <Col id="content" className="about-us">
            <Row id="about-us">

                <Col xs={12}>
                    
                    <h2 className="pb-3">Who Is Cheezy?</h2>
                    
                    <Image className="img-right" src="./images/CheezyAbout.jpg" thumbnail alt="Get Cheezy" />
                    
                    <p>Cheezy was founded in 2020 by a group of four programmers over a glass of fine Pinot Grigio. It's conception was created out of our love for pairing exotic and gourmet foods for the perfect cheeseboard.</p>

                    <p>We know the struggle of trying to find the perfect pieces to put together the perfect spread of cheeses, meats, fruits, and nuts. Sometimes it involves traveling all over town, and visits to several different stores.</p>

                    <p>With some amazing contacts all over the world, we've put together the best of the best, to make an absolutely amazing cheeseboard foryour next get-together.</p>

                    <div class="divider"></div>

                    <h2 className="pb-3">Did You Know?</h2>

                    <p>Cheese is one of the oldest man-made foods, dating back as early as 3500-2800 BC in Mesopotamia. There are even other instances of archeological studies showing that it may have been cultivated as far back as 15000-20000 BC! Greek and Roman cultures established the craft after storing milk in hot climates, facilitating the curdling of milk, leading to theaccidental discovery of the treasure that is cheese.</p>

                    <Image className="img-left" src="./images/oldCheese.jpg" thumbnail alt="Tacuinum Sanitatis Casanatensis (14th century)" />
                    
                    <p>Cheesemaking continued to flourish in Europe and became an established food. In fact, the Pilgrims included cheese in the Mayflower’s supplies when they made their voyage to America in 1620. The making of cheese quickly spread in the New World, but until the 19th century it remained a local farm industry. It wasn’t until 1851 that the first cheese factory in the United States was built by Jesse Williams in Oneida County, New York.</p>

                    <p>As population across the United States continued to grow dramatically, the demand for cheese increased and the industry gradually moved westward, centering on the rich farm lands of Wisconsin. In 1845, a band of Swiss immigrants settled in Green County, Wisconsin and started the manufacturing of foreign cheese in America. Most Wisconsin farmers began to believe that their future survival was tied to cheese and their first factory was a Limburger plant which opened in 1868.</p>

                    <div class="divider"></div>

                    <h2 className="pb-3">Cheeseboards, Really?</h2>

                    <Image className="img-right" src="./images/cheeseboard.jpg" thumbnail alt="Cheeseboard" />

                    <p>The earliest cheeseplates started appearing in Paris around 1916. It was between now and the second World War that this dish became a popular choice for social gatherings, especially among nobilty. They often would take place of expensive dessert dishes. After WWII, cheeseboards became very popular as an affordable and easier to prepare alternative to hors d'oeuvres.
                    </p>

                    <p>The 80s and 90s brought a flood of cheap processed alternative cheeses. It lacked quality, and was percieved as less than adequate for its sophisticated consumers. Thankfully, as we entered the new century, there was a revitalization of specialty and artisanal cheese production. It brought about the return of the modern cheeseboard in all it's glory. And now, here we are!
                    </p>

                    <p><em><small>Sources: World-Cheese-Map, Wikipedia</small></em></p>
                </Col>
            </Row>
        </Col>
    )
}

export default AboutUs;
import React, { useEffect } from 'react';
import { Col, Row, Image } from 'react-bootstrap';
import './Contact.css';

const AboutUs = ({ setHeaderClass }) => {

    useEffect(() => {
        setHeaderClass('about');
    }, []);

    return (
        <Col id="content">
            <Row className="contactForm">
                <h2>Who is Cheezy?</h2>
                <Row>
                    <Col xs={4}>
                        <Image src="./images/CheezyAbout.jpg" thumbnail alt="GetCheezy" />
                    </Col>
                    <Col>
                        <p>Cheezy was founded in 2020 by a group of four programmers over a glass of fine Pinot Grigio.
                        It's conception was created out of our love for pairing exotic and gourmet foods for the perfect cheeseboard.
                        </p>
                        <p>
                            We know the struggle of trying to find the perfect pieces to put together the perfect
                            spread of cheeses, meats, fruits, and nuts. Sometimes it involves traveling all over
                            town, and visits to several different stores. With some amazing contacts all over the world,
                            we've put together the best of the best, to make an absolutely amazing cheeseboard for
                            your next get-together.
                        </p>
                        <br />
                        <hr />
                    </Col>
                </Row>
                <h2>Did you know?</h2>
                <Row>
                    <Col><p>Cheese is one of the oldest man-made foods, dating back as early as 3500-2800 BC in
                    Mesopotamia. There are even other instances of archeological studies showing that it
                    may have been cultivated as far back as 15000-20000 BC! Greek and Roman cultures established
                    the craft after storing milk in hot climates, facilitating the curdling of milk, leading to the
                    accidental discovery of the treasure that is cheese.
                        </p>
                        <p>
                            Cheesemaking continued to flourish in Europe and became an established food. In fact, the Pilgrims
                            included cheese in the Mayflower’s supplies when they made their voyage to America in 1620. The making
                            of cheese quickly spread in the New World, but until the 19th century it remained a local farm industry.
                            It wasn’t until 1851 that the first cheese factory in the United States was built by Jesse Williams in
                            Oneida County, New York.
                </p>
                    </Col>
                    <Col xs={3}>
                        <Image src="./images/OldCheese.jpg" thumbnail alt="Old Cheese" title="Cheese-making, Tacuinum sanitatis Casanatensis (14th century)" />
                    </Col>
                </Row>
                <br></br>


                <p>
                    As population across the United States continued to grow dramatically, the demand for cheese increased and
                    the industry gradually moved westward, centering on the rich farm lands of Wisconsin. In 1845, a band of
                    Swiss immigrants settled in Green County, Wisconsin and started the manufacturing of foreign cheese in America.
                    Most Wisconsin farmers began to believe that their future survival was tied to cheese and their first factory was
                    a Limburger plant which opened in 1868.
                </p>
                <p>
                    The earliest cheeseplates started appearing in Paris around 1916. It was between now and the second World
                    War that this dish became a popular choice for social gatherings, especially among nobilty. They often
                    would take place of expensive dessert dishes. After WWII, cheeseboards became very popular as an
                    affordable and easier to prepare alternative to hors d'oeuvres.
                </p>
                <p>The 80s and 90s brought a flood of cheap processed alternative cheeses. It lacked quality,
                and was percieved as less than adequate for its sophisticated consumers. Thankfully, as
                we entered the new century, there was a revitalization of specialty and artisinal cheese
                production. It brought about the return of the modern cheeseboard in all it's glory. And
                now, here we are!
                </p>
                <p>Sources: World-Cheese-Map, Wikipedia</p>


            </Row>
        </Col>
    )
}

export default AboutUs;
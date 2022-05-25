import React from 'react'
import { Carousel } from 'react-bootstrap'

const Banner = () =>
{
    return (
        <>


            <Carousel style={ { marginTop: "8px" } } >
                <Carousel.Item interval={ 1000 }>
                    <img
                        className="d-block w-100"
                        src="banner1.png"
                        alt="First slide"
                        height='450px'
                    />
                    <Carousel.Caption>

                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item interval={ 500 }>
                    <img
                        className="d-block w-100"
                        src="baner2.png"
                        alt="Second slide"
                        height='450px'
                    />
                    <Carousel.Caption>

                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="banner1.png"
                        alt="Third slide"
                        height='450px'
                    />
                    <Carousel.Caption>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>

        </>
    )
}

export default Banner
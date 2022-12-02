import React from 'react'
import useSWR from 'swr'
import Error from 'next/error'
import Card from 'react-bootstrap/Card'
import { favouritesAtom } from '../store'
import { useAtom } from 'jotai'
import { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap'
import { addToFavourites, removeFromFavourites } from '../lib/userData'

const ArtworkCardDetail = (props) => {
    const [favouritesList, setFavouritesList] = useAtom(favouritesAtom)
    const [showAdded, setShowAdded] = useState(false)
    const { data, error } = useSWR(props.objectID ? `https://collectionapi.metmuseum.org/public/collection/v1/objects/${props.objectID}` : null)

    useEffect(()=>{
        setShowAdded(favouritesList?.includes(props.objectID))
    }, [favouritesList])

    
    async function favouritesClicked() {
        if (showAdded) {
            setFavouritesList(await removeFromFavourites(props.objectID))
            setShowAdded(false)
        } else {
            setFavouritesList(await addToFavourites(props.objectID))
            setShowAdded(true)
        }
    }

    if (error) {
        return (
            <Error statusCode={404}></Error>
        )
    } else if (data) {
        return (
            <Card>
                <Card.Img variant="top" src={data.primaryImage ? data.primaryImage : ""} />
                <Card.Body>
                    <Card.Title>{data.title ? data.title : "N/A"}</Card.Title>
                    <Card.Text>
                        <strong>Date: </strong>{data.objectDate ? data.objectDate : "N/A"} <br />
                        <strong>Classification: </strong>{data.classification ? data.classification : "N/A"} <br />
                        <strong>Medium: </strong>{data.medium ? data.medium : "N/A"}
                        <br />
                        <br />
                        <strong>Artist: </strong>{data.artistDisplayName ? data.artistDisplayName : "N/A"}
                        {data.artistDisplayName ? " ( " : ""}
                        {data.artistDisplayName ? <a href={data.artistWikidata_URL} target="_blank" rel="noreferrer">wiki</a> : ""}
                        {data.artistDisplayName ? " )" : ""} <br />
                        <strong>Credit Line: </strong>{data.creditLine ? data.creditLine : "N/A"} <br />
                        <strong>Dimensions: </strong>{data.dimensions ? data.dimensions : "N/A"} <br /> <br />
                        <Button variant={showAdded ? "primary" : "outline-primary"} onClick={favouritesClicked} >
                            {showAdded ? "+Favourite(added)" : "+Favourite"}
                        </Button>
                    </Card.Text>
                </Card.Body>
            </Card>
        )
    } else {
        return (null)
    }
}
export default ArtworkCardDetail

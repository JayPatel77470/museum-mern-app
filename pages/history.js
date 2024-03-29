import { useAtom } from "jotai"
import { searchHistoryAtom } from "../store"
import { useRouter } from "next/router"
import { ListGroup } from "react-bootstrap"
import { Button } from "react-bootstrap"
import styles from "../styles/History.module.css"
import { Card } from "react-bootstrap"
import { removeFromHistory } from "../lib/userData"

const History = () => {
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom)
    let parsedHistory = []
    const router = useRouter()
    if(!searchHistory) return null;

    function historyClicked(e, index) {
        router.push(`/artwork?${searchHistory[index]}`)
    }

    async function removeHistoryClicked(e, index) {
        e.stopPropagation();
        setSearchHistory(await removeFromHistory(searchHistory[index])) 
    }
    searchHistory.forEach(item => {
        let params = new URLSearchParams(item);
        let entries = params.entries();
        parsedHistory.push(Object.fromEntries(entries));
    })
    return (
        <>
            {
                parsedHistory.length > 0 ?
                    <ListGroup>
                        {parsedHistory.map((historyItem, index) => {
                            return (
                                <ListGroup.Item key={index} className={styles.historyListItem} onClick={e => historyClicked(e, index)}>
                                    {Object.keys(historyItem).map(key => { return (<>{key}: <strong>{historyItem[key]}</strong>&nbsp;</>) })}
                                    <Button className="float-end" variant="danger" size="sm" onClick={e => removeHistoryClicked(e, index)}>&times;</Button>
                                </ListGroup.Item>
                            )
                        })}
                    </ListGroup> :
                    <Card>
                        <Card.Body>
                            <h4>Nothing Here</h4>
                            Try searching for some artwork.
                        </Card.Body>
                    </Card>
            }
        </>
    )
}

export default History

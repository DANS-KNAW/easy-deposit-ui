import * as express from 'express';
import { Request, Response } from "express"
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import { createDeposit, deleteDeposit, getData, getDeposit, getState, setState } from "./db"

const app = express();
app.use(bodyParser.json());
app.use(cors())

app.get('/deposit', (req: Request, res: Response) => {
    console.log("GET /deposit")
    res.status(200)
    res.json(getData().deposit)
    console.log("  200")
})
app.post('/deposit', (req: Request, res: Response) => {
    console.log("POST /deposit")
    res.status(201)
    res.json(createDeposit())
    console.log("  201")
})

app.get('/deposit/:id', (req: Request, res: Response) => {
    console.log(`GET /deposit/${req.params.id}`)
    res.status(200)
    res.json(getDeposit(req.params.id))
    console.log("  200")
})
app.delete('/deposit/:id', (req: Request, res: Response) => {
    console.log(`DELETE /deposit/${req.params.id}`)
    if (deleteDeposit(req.params.id)) {
        res.status(204)
        res.send("Resource deleted.")
        console.log("  204")
    }
    else {
        res.status(404)
        res.send("Not found.")
        console.log("  404")
    }
})

app.get('/deposit/:id/metadata', (req: Request, res: Response) => {
    console.log(`GET /deposit/${req.params.id}/metadata`)
    // TODO to be implemented
    console.log("  ???")
})
app.put('/deposit/:id/metadata', (req: Request, res: Response) => {
    console.log(`PUT /deposit/${req.params.id}/metadata`)
    // TODO to be implemented
    console.log("  ???")
})

app.get('/deposit/:id/state', (req: Request, res: Response) => {
    console.log(`GET /deposit/${req.params.id}/state`)
    const state = getState(req.params.id)
    if (state) {
        res.status(200)
        res.json(state)
        console.log("  200")
    }
    else {
        res.status(404)
        res.send("Not found. The client may derive from this response that the containing deposit does not exist, either.")
        console.log("  404")
    }
})
app.put('/deposit/:id/state', (req: Request, res: Response) => {
    console.log(`PUT /deposit/${req.params.id}/state`)
    const body = req.body
    if (Object.keys(body).filter(value => value !== "state" && value !== "state_description").length == 0) {
        const state = getState(req.params.id)
        if (state) {
            if (state.state === "DRAFT" && body.state === "SUBMITTED" || state.state === "REJECTED" && body.state === "DRAFT") {
                if (setState(req.params.id, body)) {
                    res.status(204)
                    res.send("Successfully updated the deposit state.")
                    console.log("  204")
                }
                else {
                    res.status(404)
                    res.send("Not found. The client may derive from this response that the containing deposit does not exist, either.")
                    console.log("  404")
                }
            }
            else {
                res.status(403)
                res.send("Forbidden. Insufficient credentials or illegal state transition. (Only allowed to transition from DRAFT to SUBMITTED and from REJECTED to DRAFT.)")
                console.log("  403")
            }
        }
        else {
            res.status(404)
            res.send("Not found. The client may derive from this response that the containing deposit does not exist, either.")
            console.log("  404")
        }
    }
    else {
        res.status(400)
        res.send("Bad request. State document is malformed.")
        console.log("  400")
    }
})

app.listen(3004, () => console.log("Running on localhost:3004"))

export default app;

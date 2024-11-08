import { Router } from 'express'

import { CredentialController } from '../controllers/credential.controller.js'
import { validateToken } from '../middleware/validateToken.js'

const credentialcontroller = new CredentialController()
export const credentialRouters = Router()

credentialRouters.get('/api/credential', validateToken, credentialcontroller.getAllCredentials)
credentialRouters.get('/api/credential/:id', validateToken, credentialcontroller.getCredential)
credentialRouters.put('/api/credential/:id', validateToken, credentialcontroller.updateCredential)
credentialRouters.delete('/api/credential/:id', validateToken, credentialcontroller.deleteCredential)

credentialRouters.post('/api/credential/login', credentialcontroller.login)
credentialRouters.post('/api/credential/password', credentialcontroller.updatePassword)

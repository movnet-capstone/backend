import express, { Response, Request } from 'express';

import ResponseValue from '../../utils/ResponseValue';
import { asyncHandler } from '../../middleware/async-handler';
import { MovnetError } from '../../middleware/MovnetError';
import { ChatService } from '../../services/chat';
import { RequestWithUser } from '../../interfaces/requests';

module.exports = (router: express.Router) => {
  /**
   * Adds a new chat
   */
  // router.post('/chat', asyncHandler(async (req: Request, res: Response) => {
  //   const name = req.body.name;
  //   const event_id = req.body.event_id;
  //
  //   if(!name || !event_id){
  //     throw new MovnetError(422, 'All fields must be filled out');
  //   }
  //
  //   const chat = await ChatService.add(name, event_id);
  //
  //   return res.json(new ResponseValue(true, chat));
  // }));

  /**
   * Creates a message and adds it to chat
   */
  router.post('/chat/:chat_id', asyncHandler(async (req: RequestWithUser, res: Response) => {
    const chat_id = req.params.chat_id;
    const message_text = req.body.message_text;

    let username;
    if(req.user) {
      username = req.user.username;
    } else {
      throw new MovnetError(500, 'No user wut');
    }

    if(!chat_id || !username || !message_text){
      throw new MovnetError(422, 'All fields must be filled out');
    }
    // TODO enforce the user to be part of the chat

    const message = await ChatService.addMessage(chat_id, username, message_text);

    return res.json(new ResponseValue(true, message));
  }));

  /**
   * Gets the chats a user is part of
   */
  router.get('/chat', asyncHandler(async (req: RequestWithUser, res: Response) => {
    if(req.user) {
      const username = req.user.username;
      const chats = await ChatService.getChatsForUser(username);

      return res.json(new ResponseValue(true, chats));
    } else {
      throw new MovnetError(500, 'No user you dingus');
    }

  }));

  /**
   * Gets the users in a chat
   */
  router.get('/chat/:chat_id', asyncHandler(async (req: Request, res: Response) => {
    const chat_id = req.params.chat_id;

    const users = await ChatService.getUsersForChat(chat_id);

    return res.json(new ResponseValue(true, users));
  }));

  /**
   * Gets the messages in a chat
   */
  router.get('/chat/:chat_id/messages', asyncHandler(async (req: Request, res: Response) => {
    const chat_id = req.params.chat_id;
    const start = req.query.start || 0;
    const limit = req.query.limit || 50;

    // TODO make sure the user is part of the chat

    const messages = await ChatService.getMessages(chat_id, start, limit);

    return res.json(new ResponseValue(true, messages));
  }));
};

import { knex } from '../utils/knex';

/**
 * Model for messages
 */
export class Event {

  /**
   * Adds a new message to the chat
   * @param event_id ID of event
   * @param name name of the event
   * @param showtime_id id of the associated showtime
   */
  public static async add(name: string, showtime_id: number) {
      const data = {
          name,
          showtime_id,
      };

      const event_id = (await knex('Event').insert(data))[0];

      const event = new Event(event_id, name, showtime_id);

      return event;
  }

  public static async getData(event_id: number) {
    const data = (await knex('Event').select('name', 'showtime_id', 'event_id').where('event_id', event_id))[0];

    return data;
  }

  public static async updateName(event_id: number, name: string) {
    await knex('Event').update({ name }).where('event_id', event_id);

    return {
      event_id,
      name,
    };
  }

  public static async deleteEvent(event_id: number) {
    return knex('Event').where('event_id', event_id).del();
  }

  // Variable names should match up with database column
  // names so this rule needs disabled
  /* tslint:disable:variable-name */
  public event_id: number;
  public name: string;
  public showtime_id: number;
  /* tslint:enable:variable-name */

  constructor(event_id: number, name: string, showtime_id: number) {
    this.event_id = event_id;
    this.name = name;
    this.showtime_id = showtime_id;
  }
}

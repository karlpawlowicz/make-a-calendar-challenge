class Calendar {
  constructor(element) {
    this.settings = {
      element,
      classes: {
        eventContainer: 'event',
        eventHeading: 'event__heading',
        eventParagraph: 'event__paragraph'
      },
      defaultEventLocation: 'Sample Location',
      defaultEventTitle: 'Sample Item',
      events: [],
      eventsContainer: document.querySelector('.events__container')
    };
  }

  bindUI = () => {
    window.layOutDay = this.layOutDay;
  };

  layOutDay = events => {
    this.settings.eventsContainer.innerHTML = '';
    this.settings.events = events.sort((a, b) => a.start - b.start);
    const columnsPerRow = this.countColumns(this.settings.events);
    let prev = 0;

    columnsPerRow.forEach(columns => {
      prev === 0
        ? this.createEvent(0, columns)
        : this.createEvent(prev, columns);

      prev += columns;
    });
  };

  countColumns = events => {
    let counter = 0;
    const result = [];

    const countColumnsHelper = input => {
      if (input.length === 1) {
        result.push(counter + 1);

        return;
      }

      if (input[1].start >= input[0].start && input[1].start < input[0].end) {
        counter++;
      } else {
        result.push(counter + 1);

        counter = 0;
      }

      countColumnsHelper(input.slice(1));
    };

    countColumnsHelper(events);

    return result;
  };

  createEvent = (start, columns) => {
    let counter = 0;

    const createEventHelper = input => {
      if (input === start + columns) return;

      const container = document.createElement('div');
      const heading = document.createElement('h2');
      const paragraph = document.createElement('p');

      container.classList.add(this.settings.classes.eventContainer);
      container.style.height = `${this.settings.events[input].end -
        this.settings.events[input].start}px`;
      container.style.left = `${(100 / columns) * counter}%`;
      container.style.top = `${this.settings.events[input].start}px`;
      container.style.width = `${100 / columns}%`;
      heading.classList.add(this.settings.classes.eventHeading);
      heading.innerHTML = this.settings.defaultEventTitle;
      paragraph.classList.add(this.settings.classes.eventParagraph);
      paragraph.innerHTML = this.settings.defaultEventLocation;

      container.appendChild(heading);
      container.appendChild(paragraph);
      this.settings.eventsContainer.appendChild(container);

      counter++;

      createEventHelper(input + 1);
    };

    createEventHelper(start);
  };
}

export default Calendar;

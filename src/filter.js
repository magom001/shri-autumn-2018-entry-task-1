export function createFilterControl(ymaps) {
  const items = [
    { title: "Active", value: "active" },
    { title: "Defective", value: "defective" }
  ].map(
    obj =>
      new ymaps.control.ListBoxItem({
        data: { content: obj.title, value: obj.value },
        state: { selected: true }
      })
  );

  const listBoxControl = new ymaps.control.ListBox({
    data: { content: "Filter by state", title: "Filter by state" },
    items,
    state: {
      filters: items.reduce((filters, item) => {
        filters[item.data.get("value")] = item.isSelected();
        return filters;
      }, {})
    }
  });

  listBoxControl.events.add(["select", "deselect"], event => {
    const item = event.get("target");
    const filters = ymaps.util.extend({}, listBoxControl.state.get("filters"));
    filters[item.data.get("value")] = item.isSelected();
    listBoxControl.state.set("filters", filters);
  });

  return listBoxControl;
}

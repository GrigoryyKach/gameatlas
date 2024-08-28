export const renderContent = (content) => {
  return content.map((node, index) => {
    if (node.type === 'paragraph') {
      return (
        <p key={index}>
          {node.children.map((child, idx) => {
            let textElement = child.text;

            if (child.type === 'link') {
              return (
                <a key={idx} href={child.href} className="text-accent hover:text-accent-hover">
                  {child.children.map((linkChild) => linkChild.text).join('')}
                </a>
              );
            }

            if (child.bold) {
              textElement = <strong key={idx}>{textElement}</strong>;
            }

            if (child.italic) {
              textElement = <em key={idx}>{textElement}</em>;
            }

            return textElement;
          })}
        </p>
      );
    }

    if (node.type === 'heading') {
      const HeadingTag = `h${node.level}`;
      return (
        <HeadingTag key={index} className={`text-${node.level}xl font-bold my-4`}>
          {node.children.map((child) => child.text).join('')}
        </HeadingTag>
      );
    }

    if (node.type === 'divider') {
      return <br key={index} />;
    }

    if (node.type === 'ordered-list' || node.type === 'unordered-list') {
      const ListTag = node.type === 'ordered-list' ? 'ol' : 'ul';
      return (
        <ListTag key={index} className={`${node.type === 'ordered-list' ? 'list-decimal' : 'list-disc'} text-white list-inside ml-3`}>
          {node.children.map((listItem, idx) => (
            <li key={idx}>
              {listItem.children[0].children.map((listItemChild, childIdx) => {
                if (listItemChild.type === 'link') {
                  return (
                    <a key={childIdx} href={listItemChild.href} className="text-accent hover:text-accent-hover">
                      {listItemChild.children.map((linkChild) => linkChild.text).join('')}
                    </a>
                  );
                }
                return listItemChild.text;
              })}
            </li>
          ))}
        </ListTag>
      );
    }

    return null;
  });
};
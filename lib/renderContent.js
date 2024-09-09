export const renderContent = (content) => {
  return content.map((node, index) => {
    if (node.type === 'paragraph') {
      const isDivider = node.children.length === 1 && node.children[0].text === '---';
      if (isDivider) {
        return <br key={index} />;
      }
      
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

    if (node.type === 'heading-one') {
      return (
        <h1 key={index} className="text-4xl font-bold my-4">
          {node.children.map((child) => child.text).join('')}
        </h1>
      );
    }

    if (node.type === 'heading-two') {
      return (
        <h2 key={index} className="text-3xl font-bold my-4">
          {node.children.map((child) => child.text).join('')}
        </h2>
      );
    }

    if (node.type === 'heading-three') {
      return (
        <h3 key={index} className="text-2xl font-bold my-4">
          {node.children.map((child) => child.text).join('')}
        </h3>
      );
    }

    if (node.type === 'heading-four') {
      return (
        <h4 key={index} className="text-xl font-bold my-4">
          {node.children.map((child) => child.text).join('')}
        </h4>
      );
    }

    if (node.type === 'divider') {
      return <br key={index} />;
    }

    if (node.type === 'numbered-list' || node.type === 'bulleted-list') {
      const ListTag = node.type === 'numbered-list' ? 'ol' : 'ul';
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

    if (node.type === 'image') {
      return (
        <img
          key={index}
          src={node.src}
          alt={node.title || ''}
          width={node.width}
          height={node.height}
          className="my-4 mx-auto"
        />
      );
    }

    return null;
  });
};
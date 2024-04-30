import { Box, Button, Flex, FormControl, FormLabel, Heading, Input, Select, Textarea, VStack } from "@chakra-ui/react";
import { FaPlus, FaTrash, FaEdit } from "react-icons/fa";
import { useState } from "react";

const Index = () => {
  const [notes, setNotes] = useState([]);
  const [tags, setTags] = useState([]);
  const [selectedTag, setSelectedTag] = useState("");
  const [noteTitle, setNoteTitle] = useState("");
  const [noteContent, setNoteContent] = useState("");
  const [newTag, setNewTag] = useState("");

  const handleAddNote = () => {
    const newNote = { id: notes.length + 1, title: noteTitle, content: noteContent, tags: selectedTag ? [selectedTag] : [] };
    setNotes([...notes, newNote]);
    setNoteTitle("");
    setNoteContent("");
  };

  const handleDeleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const handleAddTag = () => {
    if (!tags.includes(newTag)) {
      setTags([...tags, newTag]);
      setNewTag("");
    }
  };

  return (
    <Flex direction="column" p={5}>
      <Heading mb={4}>GPT Engineer Notes App</Heading>
      <VStack spacing={4}>
        <FormControl>
          <FormLabel htmlFor="tag-filter">Filter by Tag</FormLabel>
          <Select id="tag-filter" placeholder="Select tag" onChange={(e) => setSelectedTag(e.target.value)}>
            {tags.map(tag => <option key={tag} value={tag}>{tag}</option>)}
          </Select>
        </FormControl>
        {notes.filter(note => note.tags.includes(selectedTag) || selectedTag === "").map(note => (
          <Box key={note.id} p={5} shadow="md" borderWidth="1px">
            <Heading fontSize="xl">{note.title}</Heading>
            <p>{note.content}</p>
            <Flex mt={2}>
              <Button leftIcon={<FaEdit />} colorScheme="blue" size="sm" mr={2}>Edit</Button>
              <Button leftIcon={<FaTrash />} colorScheme="red" size="sm" onClick={() => handleDeleteNote(note.id)}>Delete</Button>
            </Flex>
          </Box>
        ))}
        <FormControl>
          <FormLabel htmlFor="note-title">Note Title</FormLabel>
          <Input id="note-title" value={noteTitle} onChange={(e) => setNoteTitle(e.target.value)} />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="note-content">Content</FormLabel>
          <Textarea id="note-content" value={noteContent} onChange={(e) => setNoteContent(e.target.value)} />
        </FormControl>
        <Button leftIcon={<FaPlus />} colorScheme="teal" onClick={handleAddNote}>Add Note</Button>
        <FormControl>
          <FormLabel htmlFor="new-tag">New Tag</FormLabel>
          <Input id="new-tag" value={newTag} onChange={(e) => setNewTag(e.target.value)} />
        </FormControl>
        <Button leftIcon={<FaPlus />} colorScheme="green" onClick={handleAddTag}>Add Tag</Button>
      </VStack>
    </Flex>
  );
};

export default Index;
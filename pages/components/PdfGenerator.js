import { useRef } from 'react';
import jsPDF from 'jspdf';

const records = [
  { id: 1, name: 'Record 1', data: 'Lorem ipsum 1' },
  { id: 2, name: 'Record 2', data: 'Lorem ipsum 2' },
  { id: 3, name: 'Record 3', data: 'Lorem ipsum 3' },
];

const RecordComponent = ({ record }) => (
  <div>
    <h2>{record.name}</h2>
    <p>{record.data}</p>
  </div>
);

const Home = () => {
  const recordRefs = useRef([]);

  const downloadPDF = (index) => {
    const doc = new jsPDF();
    doc.text(`Record Name: ${records[index].name}`, 10, 10);
    doc.text(`Record Data: ${records[index].data}`, 10, 20);
    doc.save(`Record_${index + 1}.pdf`);
  };

  return (
    <div>
      {records.map((record, index) => (
        <div key={index}>
          <RecordComponent record={record} />
          <button onClick={() => downloadPDF(index)}>Download PDF</button>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default Home;

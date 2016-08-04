// $(() => {
//
//   $('table').on('click', '.delete', deleteCat);
//
// });
//
// function deleteCat() {
//   console.log('delete');
//
//   $(this).closest('tr').data('id');
//
//   console.log('catId:', catId);
//
//   $.ajax(`/cats/${catId}`, {
//     method: 'DELETE'
//   })
//   .done(() => {
//     console.log('delete success!');
//
//     renderList();
//   })
//   .fail(err => {
//     console.log('err:', err);
//   })
// }
//
// function renderList() {
//   $.get('/cats')
//     .done(cats => {
//       $('#catList').empty();
//
//       let $trs = cats.map(cat => {
//         let $tr = $('#template').clone();
//         $tr.removeAttr('id');
//         $tr.find('.name').text(cat.name);
//         $tr.find('.weight').text(cat.weight);
//         $tr.data('id', cat.id);
//         return $tr;
//       })
//
//       $('#catList').empty().append($trs);
//
//     });
// }

function Init(){
    document.getElementById("G1").style.visibility="hidden";
    document.getElementById("G2").style.visibility="hidden";
    document.getElementById("G3").style.visibility="visible";
}
function f(){    
    document.getElementById("G1").style.visibility="hidden";
    document.getElementById("G2").style.visibility="visible";
}
function get(data){  
    document.getElementById("G3").style.visibility="hidden";
  document.getElementById("G2").style.visibility="hidden";
    document.getElementById("G1").style.visibility="visible";
    document.getElementById("vg1").src = data["ig1"];
    document.getElementById("vg2").src = data["ig2"];
    document.getElementById("fx1").src= "./equation/"+data["Reaction"];
    document.getElementById("CT").innerHTML= "<b>Công thức cấu tạo: "+data["Info"]["CT"]+"</b>";
    document.getElementById("DE").innerHTML= "<b>Mô tả: "+data["Info"]["DE"]+"</b>";
    document.getElementById("M").innerHTML= "<b>Khối lượng phân tử: "+data["Info"]["M"]+"</b>";
    document.getElementById("PL").innerHTML= "<b>Phân loại: "+data["Info"]["PL"]+"</b>";
    document.getElementById("DS").innerHTML= "<b>Điểm sôi: "+data["Info"]["DS"]+"</b>";
    document.getElementById("HT").innerHTML= "<b>Có thể hòa tan trong: "+data["Info"]["HT"]+"</b>";
    document.getElementById("i1").innerHTML= "<b>"+data["Info"]["i1"]+"</b>";
    document.getElementById("IUP").innerHTML= "<b>Tên IUPAC: "+data["Info"]["IUP"]+"</b>";
    document.getElementById("NB").innerHTML= "<b><a onclick='f()'>"+data["Info"]["NB"]+"</a></b>";
    alert(data["Reaction"]["Info"]["CT"]);
}
window.onload = Init();


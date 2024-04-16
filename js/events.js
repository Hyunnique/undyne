function hitObject(sCollider)
{
	if (sCollider == "#love01" || sCollider == "#love02" || sCollider == "#love03" || sCollider == "#love04" || sCollider == "#love05")
	{
		var index = Collider.indexOf(sCollider);
		if (index > -1) Collider.splice(index, 1);
		$(sCollider).remove();

		score += 10;
		ui_refresh();
	}

	return;
}